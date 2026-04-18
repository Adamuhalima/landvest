import { supabase } from '../supabaseClient';

export const createListingService = async (formData) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'You must be logged in to create a listing' };
    }

    const uploadedFileUrls = [];

    // Upload each file to Supabase storage
    for (const file of formData.files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `listings/${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-files')
        .upload(filePath, file);

      if (uploadError) {
        return { success: false, error: `File upload failed: ${uploadError.message}` };
      }

      // Get public URL for the uploaded file
      const { data } = supabase.storage
        .from('property-files')
        .getPublicUrl(filePath);

      uploadedFileUrls.push({
        file_path: filePath,
        public_url: data.publicUrl,
        file_name: file.name,
        file_type: file.type
      });
    }

    // Insert listing data into database
    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          user_id: user.id,
          name: formData.name,
          property_type: formData.propertyType,
          location: formData.location,
          price: parseFloat(formData.price),
          area: parseFloat(formData.area),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          description: formData.description,
          media_files: uploadedFileUrls, // Store file info as JSONB
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getListings = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getListingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
