import axios from "axios";

export const CreateVouchers = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/vouchers/create`,
      data 
    );
    return response.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw new Error("Failed to create voucher");
  }
};

export const GetAllVouchers = async (params) => {
  try {
    const response = await axios.get(`http://localhost:8080/vouchers`, {
      params: params // Mengirimkan parameter sebagai query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw new Error("Failed to fetch vouchers");
  }
};



