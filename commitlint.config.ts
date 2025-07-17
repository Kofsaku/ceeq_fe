module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(\w+)\]\s(.+)$/, // Định dạng [type] mô_tả
      headerCorrespondence: ["type", "subject"],
    },
  },
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Tính năng mới
        "fix", // Sửa lỗi
        "docs", // Chỉ thay đổi tài liệu
        "style", // Khoảng trắng, định dạng, thêm dấu chấm phẩy, v.v.
        "refactor", // Cải tiến mã (tái cấu trúc) không ảnh hưởng đến các thông số kỹ thuật
        "perf", // Cải thiện hiệu suất liên quan
        "test", // Liên quan đến bài kiểm tra
        "chore", // Xây dựng, công cụ hỗ trợ và thư viện
      ],
    ],
    "type-empty": [2, "never"], // type không được để trống
    "subject-empty": [2, "never"], // subject không được để trống
    "subject-case": [2, "always", "lower-case"], // mô_tả phải viết thường
    "subject-max-length": [2, "always", 72], // Giới hạn độ dài mô_tả
  },
};
