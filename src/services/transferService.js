import { supabase } from '../supabaseClient';

/**
 * Initiate a fraction transfer to a friend
 * @param {Object} transferData - { from_user_id, to_user_email, investment_id, num_fractions }
 * @returns {Promise<Object>} - { success: boolean, data: object, error: string }
 */
export const initiateTransfer = async (transferData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'You must be logged in to transfer fractions' };
    }

    const { to_user_email, investment_id, num_fractions } = transferData;

    if (!to_user_email || !investment_id || !num_fractions) {
      return { success: false, error: 'Missing required transfer data' };
    }

    // Get the investment to transfer
    const { data: investment, error: invError } = await supabase
      .from('investments')
      .select('*')
      .eq('id', investment_id)
      .eq('user_id', user.id)
      .single();

    if (invError || !investment) {
      return { success: false, error: 'Investment not found or you do not own it' };
    }

    if (investment.num_fractions < num_fractions) {
      return { success: false, error: 'Insufficient fractions to transfer' };
    }

    // Create transfer request
    const { data, error } = await supabase
      .from('fraction_transfers')
      .insert([
        {
          from_user_id: user.id,
          to_user_email,
          investment_id,
          property_id: investment.property_id,
          num_fractions: parseInt(num_fractions),
          fraction_price: investment.fraction_price,
          total_amount: num_fractions * investment.fraction_price,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all pending transfer requests for current user
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getPendingTransfers = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get transfers where user is the recipient (email match)
    const { data, error } = await supabase
      .from('fraction_transfers')
      .select('*')
      .eq('to_user_email', user.email)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    // Fetch property and sender details for each transfer
    const transfersWithDetails = await Promise.all(
      (data || []).map(async (transfer) => {
        const [propertyResult, userResult] = await Promise.all([
          supabase
            .from('properties')
            .select('*')
            .eq('id', transfer.property_id)
            .single(),
          supabase
            .from('users')
            .select('email, full_name')
            .eq('id', transfer.from_user_id)
            .single()
        ]);
        
        return {
          ...transfer,
          properties: propertyResult.data,
          sender: userResult.data
        };
      })
    );

    return { success: true, data: transfersWithDetails || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get transfer history for current user
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getTransferHistory = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('fraction_transfers')
      .select(`
        *,
        investments:investment_id(*),
        properties:property_id(*)
      `)
      .or(`from_user_id.eq.${user.id},to_user_email.eq.${user.email}`)
      .ne('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get sent (outgoing) pending transfers from current user
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getSentTransfers = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('fraction_transfers')
      .select('*')
      .eq('from_user_id', user.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    // Fetch property details for each transfer
    const transfersWithProperties = await Promise.all(
      (data || []).map(async (transfer) => {
        const { data: property } = await supabase
          .from('properties')
          .select('*')
          .eq('id', transfer.property_id)
          .single();
        
        return {
          ...transfer,
          properties: property
        };
      })
    );

    return { success: true, data: transfersWithProperties || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Accept a transfer request and add fractions to recipient's investment
 * @param {string} transferId - Transfer ID to accept
 * @returns {Promise<Object>} - { success: boolean, error: string }
 */
export const acceptTransfer = async (transferId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get the transfer request
    const { data: transfer, error: transError } = await supabase
      .from('fraction_transfers')
      .select('*')
      .eq('id', transferId)
      .single();

    if (transError || !transfer) {
      return { success: false, error: 'Transfer not found' };
    }

    if (transfer.to_user_email !== user.email) {
      return { success: false, error: 'You are not authorized to accept this transfer' };
    }

    if (transfer.status !== 'pending') {
      return { success: false, error: 'This transfer has already been processed' };
    }

    // Update transfer status
    const { error: updateError } = await supabase
      .from('fraction_transfers')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', transferId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    // Check if recipient already has investment in this property
    const { data: existingInv } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', user.id)
      .eq('property_id', transfer.property_id)
      .single();

    if (existingInv) {
      // Add fractions to existing investment
      const newTotal = existingInv.num_fractions + transfer.num_fractions;
      const newAmount = newTotal * transfer.fraction_price;

      await supabase
        .from('investments')
        .update({
          num_fractions: newTotal,
          total_amount: newAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingInv.id);
    } else {
      // Create new investment for recipient
      await supabase
        .from('investments')
        .insert([
          {
            user_id: user.id,
            property_id: transfer.property_id,
            num_fractions: transfer.num_fractions,
            fraction_price: transfer.fraction_price,
            total_amount: transfer.total_amount,
            status: 'active',
            created_at: new Date().toISOString()
          }
        ]);
    }

    // Reduce fractions from sender's investment
    const { data: senderInv, error: senderError } = await supabase
      .from('investments')
      .select('*')
      .eq('id', transfer.investment_id)
      .single();

    if (senderInv) {
      const remainingFractions = senderInv.num_fractions - transfer.num_fractions;

      if (remainingFractions > 0) {
        await supabase
          .from('investments')
          .update({
            num_fractions: remainingFractions,
            total_amount: remainingFractions * transfer.fraction_price,
            updated_at: new Date().toISOString()
          })
          .eq('id', transfer.investment_id);
      } else {
        // Delete investment if no fractions left
        await supabase
          .from('investments')
          .delete()
          .eq('id', transfer.investment_id);
      }
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Decline a transfer request
 * @param {string} transferId - Transfer ID to decline
 * @returns {Promise<Object>} - { success: boolean, error: string }
 */
export const declineTransfer = async (transferId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('fraction_transfers')
      .update({ status: 'declined', updated_at: new Date().toISOString() })
      .eq('id', transferId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Cancel a transfer request (sender only)
 * @param {string} transferId - Transfer ID to cancel
 * @returns {Promise<Object>} - { success: boolean, error: string }
 */
export const cancelTransfer = async (transferId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('fraction_transfers')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', transferId)
      .eq('from_user_id', user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
