import useAxios from ".";
// Mendapatkan semua content untuk ditaruh di halaman dashboard
export const GetAllFavourites = async () => {
  try {
    const response = await useAxios.get("/favourites", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// [Tidak dipakai] Mendapatkan content by id user
export const GetContentById = async (id) => {
  try {
    const response = await useAxios.get(`/favourites/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Membuat content baru
export const CreateFavourites = async (data) => {
  // try {
  //   const formData = new FormData();
  //   formData.append("id_content", data);
  //   const res = await fetch("http://localhost:8000/api/favourites/", {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: formData,
  //     method: "POST",
  //   });
  //   const jsonData = await res.json();
  //   return jsonData;
  // } catch (err) {
  //   console.log(err);
  //}

    try {
      const response = await useAxios.post("/favourites", data, {
        
        headers: {
          "Content-Type": "multipart/form-data", // untuk upload thumbnail
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      // console.log(response.headers)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

// [Tidak dipakai] mengedit content
export const UpdateContent = async (values) => {
  try {
    const response = await useAxios.put(`/favourites/${values.id}`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Menghaspu content
export const DeleteFavourites = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/favourites/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
