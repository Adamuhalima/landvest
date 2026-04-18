import { supabase } from '../supabaseClient';

/**
 * Get seller notifications - investments in properties you created
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getSellerNotifications = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get all investments in properties created by this user
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .in(
        'property_id',
        // First get all properties created by this user
        supabase
          .from('properties')
          .select('id')
          .eq('user_id', user.id)
      );

    if (error) {
      return { success: false, error: error.message };
    }

    // Fetch property and investor details for each investment
    const notificationsWithDetails = await Promise.all(
      (data || []).map(async (investment) => {
        const [propertyResult, investorResult] = await Promise.all([
          supabase
            .from('properties')
            .select('*')
            .eq('id', investment.property_id)
            .single(),
          supabase
            .from('users')
            .select('email, full_name')
            .eq('id', investment.user_id)
            .single()
        ]);

        return {
          ...investment,
          properties: propertyResult.data,
          investor: investorResult.data
        };
      })
    );

    return { success: true, data: notificationsWithDetails || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get investment progress for a property (total fractions sold, percentage)
 * @param {string} propertyId - ID of the property
 * @returns {Promise<Object>} - { success: boolean, data: object, error: string }
 */
export const getPropertyInvestmentProgress = async (propertyId) => {
  try {
    // Get all investments for this property
    const { data, error } = await supabase
      .from('investments')
      .select('num_fractions')
      .eq('property_id', propertyId)
      .eq('status', 'active');

    if (error) {
      return { success: false, error: error.message };
    }

    // Calculate total fractions invested
    const totalFractions = (data || []).reduce(
      (sum, inv) => sum + inv.num_fractions,
      0
    );

    // Calculate percentage (out of 100 total fractions)
    const percentage = Math.min((totalFractions / 100) * 100, 100);

    return {
      success: true,
      data: {
        totalFractionsSold: Math.min(totalFractions, 100),
        percentage: percentage,
        investorCount: data.length,
        fractionsSold: totalFractions,
        fractionsAvailable: Math.max(100 - totalFractions, 0),
        isFull: totalFractions >= 100
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all my listings (properties created by current user)
 * @returns {Promise<Object>} - { success: boolean, data: array, error: string }
 */
export const getMyListings = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get properties created by this user
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    // Fetch investment progress for each property
    const listingsWithProgress = await Promise.all(
      (data || []).map(async (property) => {
        const progressResult = await getPropertyInvestmentProgress(property.id);

        return {
          ...property,
          investmentProgress: progressResult.data || {}
        };
      })
    );

    return { success: true, data: listingsWithProgress || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get property details with investment progress
 * @param {string} propertyId - ID of the property
 * @returns {Promise<Object>} - { success: boolean, data: object, error: string }
 */
export const getPropertyWithProgress = async (propertyId) => {
  try {
    // Get property details
    const { data: property, error: propError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();

    if (propError || !property) {
      return { success: false, error: 'Property not found' };
    }

    // Get investment progress
    const progressResult = await getPropertyInvestmentProgress(propertyId);

    return {
      success: true,
      data: {
        ...property,
        investmentProgress: progressResult.data
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
