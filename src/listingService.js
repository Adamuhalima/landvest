import { supabase } from './supabaseClient'

// ==================== LISTINGS ====================
export const createListingService = async (listingData) => {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized. Listing saved locally.')
      return { success: true, data: listingData }
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    // Prepare data for insertion
    const insertData = {
      name: listingData.name,
      property_type: listingData.propertyType,
      location: listingData.location,
      price: parseFloat(listingData.price),
      area: parseFloat(listingData.area),
      bedrooms: parseInt(listingData.bedrooms),
      bathrooms: parseInt(listingData.bathrooms),
      file: listingData.file, // Assuming this is a URL or base64 string
      description: listingData.description,
      created_at: new Date().toISOString(),
      created_by: user?.id || null,
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('listings')
      .insert([insertData])
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error creating listing:', error)
    return { success: false, error: error.message }
  }
}

export const getListingsService = async () => {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized. Returning empty listings.')
      return { success: true, data: [] }
    }

    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        users:auth.users (
          email,
          raw_user_meta_data
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching listings:', error)
    return { success: false, error: error.message }
  }
}

// ==================== AUTH ====================
export const signUpService = async (email, password, fullName) => {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized. Signup saved locally.')
      return { success: true, data: { email, fullName } }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error signing up:', error)
    return { success: false, error: error.message }
  }
}

export const loginService = async (email, password) => {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized. Login failed.')
      return { success: false, error: 'Supabase not initialized' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error logging in:', error)
    return { success: false, error: error.message }
  }
}

export const logoutService = async () => {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized.')
      return { success: true }
    }

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error logging out:', error)
    return { success: false, error: error.message }
  }
}

export const getCurrentUserService = async () => {
  try {
    if (!supabase) {
      return { success: false, user: null }
    }

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return { success: false, user: null }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { success: false, user: null }
  }
}