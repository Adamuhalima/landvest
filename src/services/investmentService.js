import { supabase } from '../supabaseClient';

/**
 * Create an investment record
 * @param {Object} investmentData - { property_id, num_fractions, fraction_price, user_id }
 * @returns {Promise<Object>} - { success: boolean, data: object, error: string }
 */
export const createInvestment = async (investmentData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'You must be logged in to invest' };
    }

    const { property_id, num_fractions, fraction_price } = investmentData;

    if (!property_id || !num_fractions || !fraction_price) {
      return { success: false, error: 'Missing required investment data' };
    }

    const totalInvestmentAmount = num_fractions * fraction_price;

    const { data, error } = await supabase
      .from('investments')
      .insert([
        {
          user_id: user.id,
          property_id,
          num_fractions: parseInt(num_fractions),
          fraction_price: parseFloat(fraction_price),
          total_amount: totalInvestmentAmount,
          status: 'active',
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
 * Get all investments for a specific user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getUserInvestments = async (userId) => {
  try {
    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }

    const { data, error } = await supabase
      .from('investments')
      .select(`
        *,
        properties:property_id(*)
      `)
      .eq('user_id', userId)
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
 * Get investments for a specific property
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getPropertyInvestments = async (propertyId) => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('property_id', propertyId)
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
 * Get current user's ID
 * @returns {Promise<string|null>} - User ID or null
 */
export const getCurrentUserId = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    return null;
  }
};

/**
 * Get total invested amount and fractions for a property
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} - { totalFractions, totalAmount }
 */
export const getPropertyInvestmentStats = async (propertyId) => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('num_fractions, total_amount')
      .eq('property_id', propertyId);

    if (error) {
      return { totalFractions: 0, totalAmount: 0 };
    }

    const totalFractions = data.reduce((sum, inv) => sum + inv.num_fractions, 0);
    const totalAmount = data.reduce((sum, inv) => sum + inv.total_amount, 0);

    return { totalFractions, totalAmount };
  } catch (error) {
    return { totalFractions: 0, totalAmount: 0 };
  }
};

/**
 * Delete an investment (admin or owner only)
 * @param {string} investmentId - Investment ID
 * @returns {Promise<Object>} - { success: boolean, error: string }
 */
export const deleteInvestment = async (investmentId) => {
  try {
    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', investmentId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
