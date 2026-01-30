
import { GoogleGenAI } from "@google/genai";
import { GeneratorConfig } from "./types";

export const generateTechContent = async (config: GeneratorConfig) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Bạn là một Siêu Trí Tuệ Phân Tích Hành Vi & Kiến Trúc Sư Nội Dung Tối Thượng (Master Tech Content Architect).
    NHIỆM VỤ: Tạo ra nội dung công nghệ đẳng cấp nhất thế giới bằng cách kết hợp nhiều chuyên môn và loại hình nội dung.
    
    YÊU CẦU CỐT LÕI:
    - Ngôn ngữ: Tiếng Việt 100%, phong cách chuyên gia hàng đầu (Senior/Lead/Architect).
    - Độ sâu: Phải bao gồm các thuật ngữ chuyên môn, ví dụ code thực tế, hoặc các case study thực chiến.
    - TỔNG HỢP: Nếu người dùng chọn nhiều chuyên ngành hoặc nhiều loại nội dung, hãy tạo ra một bản tài liệu tổng thể (Master Document) kết hợp hài hòa các yếu tố đó. Đừng viết rời rạc.
    - Cấu trúc bài viết: Phải có Tiêu đề thu hút (Hook), Thân bài (Insight & Solution), Kết luận & CTA mạnh mẽ.
    
    THÔNG TIN ĐẦU VÀO:
    - Chuyên ngành: ${config.domains.join(', ')}
    - Loại nội dung: ${config.contentTypes.join(', ')}
    - Đối tượng mục tiêu: ${config.targetAudience}
    - Giọng văn: ${config.tone}
    - Công nghệ sử dụng: ${config.techStack}
    - Mục tiêu cuối cùng: ${config.goal}
    - Chi tiết bổ sung: ${config.extraDetails}
  `;

  const prompt = `
    Hãy soạn thảo một hệ thống nội dung tích hợp cho các chủ đề: ${config.domains.join(' & ')}.
    Yêu cầu thực hiện theo các định dạng: ${config.contentTypes.join(', ')}.
    Hãy tập trung vào việc cung cấp giá trị thực chiến, các bước triển khai chi tiết và phân tích sâu sắc.
    Sử dụng Markdown để định dạng chuyên nghiệp. Nếu có nhiều loại nội dung, hãy phân tách bằng các tiêu đề H2 rõ ràng.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
