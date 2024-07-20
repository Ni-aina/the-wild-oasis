import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if (error) {
        console.error(error);
        throw new Error('cabins could not loaded');
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    // check image type
    const hasImage = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    let query = supabase.from('cabins')

    // Create cabin
    if (!id)
        query = query.insert([{ ...newCabin, image: imagePath }])

    if (id)
        query = query.update([{ ...newCabin, image: imagePath }]).eq('id', id)
        
    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('cabins could not created');
    }

    //Upload image
    if (!hasImage) {
        const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)
    
        if (storageError) {
            await supabase.from('cabins').delete().eq('id', data.id)
            console.error(storageError);
            throw new Error('image could not uploaded and cabins was not created');
        }
    }

    return data;
}

export async function deleteCabin(id) {

    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error('cabin could not deleted');
    }
} 