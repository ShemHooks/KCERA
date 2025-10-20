import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const AiAnalysis = async (question) => {
  try {
    const response = await axiosPrivateInstance.post("api/ai/analyze", {
      question,
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

export default AiAnalysis;
