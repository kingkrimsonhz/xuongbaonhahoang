export type MenuCategory = 'all' | 'savory' | 'sweet' | 'plain' | 'combo';

export interface BunProduct {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  shortNote: string;
  description: string;
  ingredients: string[];
  nutritionNote: string;
  image: string;
  hasSauceOption: boolean;
  highlightTag?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  timeRange: string;
  title: string;
  teamName: string;
  members: string[];
  summary: string;
  details: string[];
  image: string;
  imageCaption: string;
}

export interface TeamGroup {
  name: string;
  role: string;
  members: string[];
  shift: string;
  responsibilities: string[];
}

export interface RiskItem {
  risk: string;
  impact: string;
  mitigation: string;
}

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả món' },
  { id: 'savory', label: 'Nhân mặn' },
  { id: 'sweet', label: 'Nhân ngọt' },
  { id: 'plain', label: 'Không nhân' },
  { id: 'combo', label: 'Combo nhóm' },
];

export const BUN_MENU: BunProduct[] = [
  {
    id: 'man-thit-bam-nam-meo',
    name: 'Bánh Bao Thịt Bằm Nấm Mèo',
    category: 'savory',
    categoryLabel: 'Nhân mặn · Truyền thống',
    price: 15000,
    shortNote: 'Vỏ mềm xốp · Nhân thịt tươi đậm đà',
    description:
      'Dòng nhân mặn chủ lực được ủ bột qua đêm, nhân thịt heo nạc vai xay nhuyễn hòa quyện nấm mèo giòn sần sật, hành tây và tiêu thơm. Hàm lượng đạm cao giúp no lâu suốt 5 tiết học buổi sáng.',
    ingredients: ['Bột mì cao cấp', 'Thịt heo nạc vai xay', 'Nấm mèo đen', 'Củ sắn & hành tím', 'Gia vị nhà làm'],
    nutritionNote: 'Chắc bụng · ~320 kcal · Đóng gói túi giấy + tương ớt',
    image: '/assets/aistudio/z8525346052408_7620756e5dd1cb173775d730edd28d5d_a1b894b7.jpg',
    hasSauceOption: true,
    highlightTag: 'Bán chạy',
  },
  {
    id: 'man-thit-trung-cut',
    name: 'Bánh Bao Thịt Bằm Trứng Cút Nấm Mèo',
    category: 'savory',
    categoryLabel: 'Nhân mặn · Đầy đặn',
    price: 20000,
    shortNote: 'Cỡ lớn 20k · Nhân trứng bùi béo',
    description:
      'Phiên bản đầy đặn nhất dành cho buổi sáng cần nhiều năng lượng: thịt bằm nấm mèo ướp vừa miệng kết hợp trứng cút béo bùi, miến dong mềm thơm bên trong lớp vỏ trắng mịn.',
    ingredients: ['Thịt heo nạc vai', 'Trứng cút / trứng gà luộc', 'Nấm mèo thái sợi', 'Miến dong', 'Vỏ bánh sữa tươi'],
    nutritionNote: 'Giàu đạm · ~410 kcal · Kèm khăn giấy & tương ớt',
    image: '/assets/aistudio/z8525346065863_3b0c670d2192c32cb0745b22ebc488d0_62fbb93a.jpg',
    hasSauceOption: true,
    highlightTag: 'Được yêu thích',
  },
  {
    id: 'man-trung-muoi-dac-biet',
    name: 'Bánh Bao Đặc Biệt Trứng Muối',
    category: 'savory',
    categoryLabel: 'Nhân mặn · Đặc biệt',
    price: 22000,
    shortNote: 'Lòng đỏ trứng muối tan chảy cùng thịt bằm',
    description:
      'Kết hợp lòng đỏ trứng muối nướng thơm lừng cùng nhân thịt bằm nấm mèo và hành lá. Vị mặn bùi cân bằng hoàn hảo với vỏ bánh ngọt thanh tự nhiên.',
    ingredients: ['Lòng đỏ trứng muối', 'Thịt bằm nấm mèo', 'Hành tây & cà rốt', 'Bột mì ủ men tự nhiên'],
    nutritionNote: 'Năng lượng cao · ~430 kcal · Giao nóng từ thùng giữ nhiệt',
    image: '/assets/aistudio/z8525346057001_7e5d7240f0f5cf6d2cb0fea2103c41a1_04a8a976.jpg',
    hasSauceOption: true,
  },
  {
    id: 'man-xa-xiu-mat-ong',
    name: 'Bánh Bao Nhân Xá Xíu Mật Ong',
    category: 'savory',
    categoryLabel: 'Nhân mặn · Đổi vị',
    price: 20000,
    shortNote: 'Thịt xá xíu rim mật ong mềm thơm',
    description:
      'Biến tấu đổi vị cho các bạn thích vị mặn ngọt hài hòa: thịt xá xíu cắt hạt lựu rim sốt dầu hào và mật ong sánh quyện trong lớp vỏ bánh xốp nhẹ.',
    ingredients: ['Thịt xá xíu nhà làm', 'Mật ong nguyên chất', 'Hành phi', 'Vỏ bánh hấp cách thủy'],
    nutritionNote: 'Dễ ăn · ~360 kcal · Kèm túi giấy gọn nhẹ',
    image: '/src/assets/images/menu_char_siu_honey_bun_1795534273126.jpg',
    hasSauceOption: true,
  },
  {
    id: 'ngot-khoai-mon',
    name: 'Bánh Bao Nhân Khoai Môn Tím',
    category: 'sweet',
    categoryLabel: 'Nhân ngọt · Thanh nhẹ',
    price: 15000,
    shortNote: 'Khoai môn nghiền mịn · Ngọt dịu tự nhiên',
    description:
      'Dòng nhân ngọt được lòng cả học sinh lẫn giáo viên nhờ vị khoai môn sáp bùi béo, ít đường, không ngấy. Thích hợp ăn sáng nhẹ nhàng hoặc ăn thêm giờ ra chơi.',
    ingredients: ['Khoai môn cao tím tươi', 'Sữa tươi không đường', 'Đường phèn thanh nhẹ', 'Bột mì thượng hạng'],
    nutritionNote: 'Thanh nhẹ · ~260 kcal · Hợp khẩu vị số đông',
    image: '/src/assets/images/menu_taro_bun_cut_1795533387727.jpg',
    hasSauceOption: false,
    highlightTag: 'Bán chạy',
  },
  {
    id: 'ngot-dau-xanh-hat-sen',
    name: 'Bánh Bao Đậu Xanh Hạt Sen',
    category: 'sweet',
    categoryLabel: 'Nhân ngọt · Chay mặn đều dùng được',
    price: 15000,
    shortNote: 'Đậu xanh sên mềm · Hương hạt sen dịu mát',
    description:
      'Nhân đậu xanh đãi vỏ sên cùng hạt sen bùi bùi, thoảng hương lá dứa nhẹ nhàng. Lựa chọn lý tưởng cho ngày ăn chay hoặc bữa xế lành mạnh.',
    ingredients: ['Đậu xanh cà vỏ', 'Hạt sen tươi', 'Dầu thực vật', 'Đường cát trắng vừa phải'],
    nutritionNote: 'Thuần chay · ~250 kcal · Gọn sạch không dính tay',
    image: '/src/assets/images/menu_mung_bean_lotus_bun_1795534272105.jpg',
    hasSauceOption: false,
  },
  {
    id: 'ngot-cade-trung-sua',
    name: 'Bánh Bao Cadé Trứng Sữa',
    category: 'sweet',
    categoryLabel: 'Nhân ngọt · Béo thơm',
    price: 16000,
    shortNote: 'Sốt cadé trứng sữa vàng ươm mịn màng',
    description:
      'Nhân cadé đánh mịn từ lòng đỏ trứng gà, nước cốt dừa và sữa tươi thơm nức mũi ngay khi tách đôi vỏ bánh nóng hổi.',
    ingredients: ['Trứng gà ta', 'Sữa tươi & nước cốt dừa', 'Bơ lạt', 'Bột sư tử & bột mì'],
    nutritionNote: 'Thơm béo · ~285 kcal · Ngon nhất khi ăn nóng',
    image: '/src/assets/images/menu_taro_bun_cut_1795533387727.jpg',
    hasSauceOption: false,
  },
  {
    id: 'khong-nhan-sua-tuoi',
    name: 'Bánh Bao Không Nhân Sữa Tươi',
    category: 'plain',
    categoryLabel: 'Không nhân · Phục vụ siêu tốc',
    price: 10000,
    shortNote: 'Giá học sinh 10k · Thơm mùi sữa, xé từng lớp',
    description:
      'Nhào bột trực tiếp bằng sữa tươi nguyên chất nên bánh xốp dai, có thể bóc từng lớp vỏ mềm mịn. Nhẹ bụng, giá rẻ và lấy hàng siêu nhanh trong 10 giây.',
    ingredients: ['Bột mì số 8', 'Sữa tươi thanh trùng', 'Men nở tự nhiên', 'Chút đường mía nhẹ'],
    nutritionNote: 'Nhẹ bụng · ~195 kcal · Phù hợp mang theo vội',
    image: '/src/assets/images/menu_plain_milk_bun_1795533387643.jpg',
    hasSauceOption: false,
    highlightTag: 'Siêu tốc 10k',
  },
  {
    id: 'khong-nhan-nguyen-cam',
    name: 'Bánh Bao Không Nhân Nguyên Cám',
    category: 'plain',
    categoryLabel: 'Không nhân · Ít đường',
    price: 10000,
    shortNote: 'Bổ sung chất xơ · Thanh đạm buổi sáng',
    description:
      'Phối trộn bột mì nguyên cám cùng sữa yến mạch ít ngọt, dành riêng cho giáo viên và học sinh muốn bữa sáng nhẹ nhàng, lành mạnh.',
    ingredients: ['Bột mì nguyên cám', 'Sữa hạt ít đường', 'Men nở tươi', 'Muối hồng'],
    nutritionNote: 'Ít đường · ~180 kcal · Bao bì giấy thân thiện môi trường',
    image: '/src/assets/images/menu_plain_milk_bun_1795533387643.jpg',
    hasSauceOption: false,
  },
  {
    id: 'combo-sang-du-chat',
    name: 'Combo Sáng Đủ Chất (1 Mặn Trứng + 1 Không Nhân)',
    category: 'combo',
    categoryLabel: 'Combo cá nhân · Tiết kiệm 2.000đ',
    price: 28000,
    originalPrice: 30000,
    shortNote: '1 Thịt bằm trứng cút + 1 Sữa tươi không nhân',
    description:
      'Dành cho ngày học 5 tiết hoặc có tiết thể dục buổi sáng: vừa có bánh nhân mặn giàu đạm, vừa có bánh không nhân ăn kèm hoặc để dành giờ ra chơi.',
    ingredients: ['1 Bánh Bao Thịt Bằm Trứng Cút (20k)', '1 Bánh Bao Không Nhân Sữa Tươi (10k)', 'Khăn giấy & tương ớt'],
    nutritionNote: 'Tiết kiệm 2.000đ · Giao cùng 1 túi giấy gọn gàng',
    image: '/assets/aistudio/1795532453609_133491019155833510_2698777658770525967_eecf1fd0ca75a4e5c37a632d057c592b_f2ccebd4.jpg',
    hasSauceOption: true,
    highlightTag: 'Tiết kiệm',
  },
  {
    id: 'combo-doi-ban',
    name: 'Combo Đôi Bạn Cùng Tiến (2 Mặn + 2 Khoai Môn)',
    category: 'combo',
    categoryLabel: 'Combo nhóm 2–4 bạn · Tiết kiệm 5.000đ',
    price: 55000,
    originalPrice: 60000,
    shortNote: '2 Thịt bằm nấm mèo + 2 Khoai môn tím',
    description:
      'Rủ bạn cùng bàn đặt chung để nhận ưu đãi combo! Đủ cả vị mặn đậm đà lẫn vị ngọt khoai môn thanh nhẹ để chia sẻ trước giờ vào lớp.',
    ingredients: ['2 Bánh Bao Thịt Bằm Nấm Mèo (30k)', '2 Bánh Bao Nhân Khoai Môn (30k)', '4 khăn giấy + tương ớt'],
    nutritionNote: 'Tiết kiệm 5.000đ · Ưu tiên giao tận bàn trước 6h55',
    image: '/assets/aistudio/1795532299163_133491019155833510_2698777658770525967_707bbe56596c6cb27f3815ef6fe8882e_f154b0d4.jpg',
    hasSauceOption: true,
  },
  {
    id: 'combo-tiep-suc-to',
    name: 'Combo Tiếp Sức Cả Tổ (10 Bánh Mix 3 Vị)',
    category: 'combo',
    categoryLabel: 'Combo tập thể · Đặt trước tối hôm trước',
    price: 135000,
    originalPrice: 150000,
    shortNote: '4 Thịt bằm trứng + 3 Khoai môn + 3 Không nhân',
    description:
      'Gói đặt theo tổ hoặc phòng giáo viên từ tối hôm trước, được chuẩn bị riêng thùng giữ nhiệt giao tận cửa lớp/văn phòng đúng giờ hẹn.',
    ingredients: ['4 Bánh nhân mặn đầy đặn', '3 Bánh nhân khoai môn tím', '3 Bánh không nhân sữa tươi', 'Đủ bộ túi giấy, khăn & tương'],
    nutritionNote: 'Tiết kiệm 15.000đ · Chốt đơn tối hôm trước trước 22h00',
    image: '/src/assets/images/workflow_delivery_school_1795533387796.jpg',
    hasSauceOption: true,
    highlightTag: 'Ưu đãi nhóm',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 'Bước 01',
    timeRange: '19:00 – 22:00 tối hôm trước',
    title: 'Nhận Pre-order & Chốt sản lượng theo lớp',
    teamName: 'Điều phối chung & Kênh Zalo / Website',
    members: ['Hoàng', 'Linh', 'Tiến'],
    summary:
      'Đăng bài nhắc đặt trước trên nhóm lớp, CLB và nhận đơn trực tuyến trên website để tính chính xác số lượng bánh từng vị, giảm tối đa rủi ro tồn hàng sáng hôm sau.',
    details: [
      'Tổng hợp danh sách lớp, khung giờ nhận và yêu cầu tương ớt riêng.',
      'Tách sẵn vốn xoay vòng nhập nguyên liệu tươi sạch (khởi điểm 249.000đ).',
      'Áp dụng ưu đãi nhẹ cho đơn đặt sớm và các gói combo mua chung theo tổ.',
    ],
    image: '/assets/aistudio/1795532453609_133491019155833510_2698777658770525967_eecf1fd0ca75a4e5c37a632d057c592b_f2ccebd4.jpg',
    imageCaption: 'Phân loại rõ 3 phân khúc giá 10k – 15k – 20k giúp học sinh dễ chọn ngay từ tối hôm trước',
  },
  {
    stepNumber: 'Bước 02',
    timeRange: '05:15 – 06:15 sáng',
    title: 'Hấp nóng & Đóng gói đồng bộ sạch sẽ',
    teamName: 'Tổ Chuẩn bị / Hấp bánh',
    members: ['Linh', 'Trâm', 'Nhi', 'Ngọc'],
    summary:
      'Sơ chế và kiểm tra chất lượng từng mẻ bánh nhà làm, hấp chín mềm xốp bằng xửng và tủ hấp mini, sau đó đóng gói sẵn vào bao bì giấy kèm khăn giấy và gói tương ớt.',
    details: [
      'Kiểm soát vệ sinh an toàn thực phẩm tuyệt đối ngay tại bếp nhà.',
      'Xếp bánh đã đóng túi giấy vào thùng giữ nhiệt chuyên dụng để giữ độ nóng hổi.',
      'Phân sẵn từng giỏ theo đơn Pre-order của từng lớp để giao siêu tốc.',
    ],
    image: '/src/assets/images/workflow_prep_steaming_1795533386722.jpg',
    imageCaption: 'Tổ Chuẩn bị (Linh, Trâm, Nhi, Ngọc) hấp nóng và đóng gói túi giấy thân thiện môi trường',
  },
  {
    stepNumber: 'Bước 03',
    timeRange: '06:30 – 07:15 sáng (Giờ vàng)',
    title: 'Giao tận bàn / tận lớp trước trống vào học',
    teamName: 'Tổ Bán / Giao bánh',
    members: ['Hoàng', 'Lâm', 'Trân'],
    summary:
      'Khắc phục hoàn toàn cảnh xếp hàng chen chúc ở căng-tin hay khói bụi vỉa hè: đội giao bánh mang thùng giữ nhiệt giao tận cửa lớp và phòng giáo viên trước 7h15.',
    details: [
      'Một bạn trực điểm bán cố định, hai bạn cơ động giao đơn đặt trước theo dãy lớp.',
      'Chốt nhanh đơn phát sinh tại chỗ, đảm bảo tất cả thành viên vào tiết học đúng giờ.',
      'Đảm bảo bánh đến tay học sinh và thầy cô vẫn nghi ngút khói, vỏ mềm tơi.',
    ],
    image: '/src/assets/images/workflow_delivery_school_1795533387796.jpg',
    imageCaption: 'Tổ Bán & Giao bánh (Hoàng, Lâm, Trân) giao bánh nóng tận lớp trước giờ vào tiết',
  },
  {
    stepNumber: 'Bước 04',
    timeRange: '07:15 – 07:30 sáng',
    title: 'Thu ngân, Đối soát Xuất–Bán–Tồn & Tách Vốn',
    teamName: 'Tổ Thu ngân',
    members: ['Tiến', 'Khang', 'Long'],
    summary:
      'Quản lý thanh toán tiền mặt (luôn chuẩn bị sẵn tiền lẻ thối nhanh) và chuyển khoản QR, ghi chép chi phí phát sinh và đối soát minh bạch giữa tiền thu – lượng bánh.',
    details: [
      'Tách bạch 100% tiền vốn xoay vòng nhập nguyên liệu và phần lợi nhuận ròng.',
      'Cập nhật bảng tính Giá vốn, Doanh thu, Lợi nhuận và Điểm hòa vốn mỗi ngày.',
      'Xử lý linh hoạt lượng tồn (nếu có) qua combo cuối buổi để không lãng phí.',
    ],
    image: '/src/assets/images/workflow_cashier_finance_1795533387916.jpg',
    imageCaption: 'Tổ Thu ngân (Tiến, Khang, Long) đối soát QR, tiền lẻ và tách bạch hũ vốn xoay vòng',
  },
];

export const TEAM_GROUPS: TeamGroup[] = [
  {
    name: 'Tổ Chuẩn bị & Hấp bánh',
    role: 'Chất lượng & Đóng gói',
    members: ['Linh', 'Trâm', 'Nhi', 'Ngọc'],
    shift: '05:15 – 06:25',
    responsibilities: [
      'Sơ chế nguyên liệu sạch, kiểm tra độ mềm xốp và độ chín nhân bánh.',
      'Hấp bánh liên tục bằng tủ hấp mini & xếp vào thùng giữ nhiệt.',
      'Đóng gói đồng bộ: túi giấy thân thiện môi trường, khăn giấy và tương ớt.',
    ],
  },
  {
    name: 'Tổ Bán & Giao bánh',
    role: 'Điểm bán & Giao tận lớp',
    members: ['Hoàng', 'Lâm', 'Trân'],
    shift: '06:30 – 07:15',
    responsibilities: [
      'Trực điểm bán cố định và chốt nhanh các đơn phát sinh giờ cao điểm.',
      'Giao đơn Pre-order tận bàn/tận lớp cho học sinh và giáo viên trước trống.',
      'Hỗ trợ chéo tổ chuẩn bị khi lượng đơn đặt trước tăng đột biến.',
    ],
  },
  {
    name: 'Tổ Thu ngân & Hạch toán',
    role: 'Tài chính & Đối soát',
    members: ['Tiến', 'Khang', 'Long'],
    shift: '06:30 – 07:30',
    responsibilities: [
      'Chuẩn bị sẵn tiền lẻ thối nhanh và bảng mã QR chuyển khoản gọn nhẹ.',
      'Thống kê sản lượng bán từng loại (không nhân, mặn, ngọt) theo ngày.',
      'Đối chiếu Xuất – Bán – Tồn, tách riêng vốn xoay vòng và lợi nhuận.',
    ],
  },
];

export const REAL_GALLERY = [
  {
    title: 'Nhân thịt bằm nấm mèo thực tế',
    caption: 'Bánh nhà làm đầy đặn, thịt tươi băm nhuyễn kết hợp nấm mèo giòn thơm và vỏ bột tơi xốp.',
    image: '/assets/aistudio/z8525346052408_7620756e5dd1cb173775d730edd28d5d_a1b894b7.jpg',
  },
  {
    title: 'Nhân trứng bùi béo giàu đạm',
    caption: 'Lòng đỏ trứng hòa quyện thịt bằm và hành tây, cung cấp đủ năng lượng cho cả buổi học.',
    image: '/assets/aistudio/z8525346065863_3b0c670d2192c32cb0745b22ebc488d0_62fbb93a.jpg',
  },
  {
    title: 'Kiểm định độ xốp & nhân nóng hổi',
    caption: 'Mỗi mẻ bánh trước khi vào thùng giữ nhiệt đều được kiểm tra độ mềm mịn và vệ sinh an toàn.',
    image: '/assets/aistudio/z8525346057001_7e5d7240f0f5cf6d2cb0fea2103c41a1_04a8a976.jpg',
  },
];

export const RISK_MATRIX: RiskItem[] = [
  {
    risk: 'Không kịp giờ cao điểm (30–45 phút)',
    impact: 'Giờ vàng 6h30–7h15 rất ngắn; giao trễ sẽ ảnh hưởng giờ vào lớp của cả khách lẫn nhóm.',
    mitigation:
      'Sơ chế và đóng gói sẵn từ sớm, ưu tiên chốt Pre-order theo lớp từ tối hôm trước, tăng cường nhân sự hỗ trợ khâu hấp và chia giỏ lúc cao điểm.',
  },
  {
    risk: 'Tồn hàng cuối buổi',
    impact: 'Bánh để qua buổi giảm độ nóng xốp và ảnh hưởng vòng quay vốn ngày tiếp theo.',
    mitigation:
      'Nhận đặt trước từ tối hôm trước để chốt sát sản lượng, theo dõi tỷ lệ tiêu thụ từng vị để điều chỉnh mẻ sau, và áp dụng combo ưu đãi cuối buổi hoặc bán nội bộ.',
  },
  {
    risk: 'Sai lệch tài chính & thất thoát tiền lẻ',
    impact: 'Thối nhầm giờ cao điểm hoặc lẫn lộn giữa tiền vốn gốc với doanh thu bán được.',
    mitigation:
      'Ghi chép chi phí ngay khi phát sinh, đối chiếu Xuất – Bán – Tồn khớp 100% với tiền thu cuối buổi, tách biệt quỹ vốn xoay vòng và duy trì quỹ dự phòng nhỏ.',
  },
  {
    risk: 'Rủi ro nhân sự & phối hợp 10 thành viên',
    impact: 'Thành viên bận lịch đột xuất hoặc trễ giờ vào tiết học sáng.',
    mitigation:
      'Phân công rõ ràng theo 3 tổ chuyên trách nhưng có cơ chế hỗ trợ chéo, nhắc lịch trước buổi bán từ tối hôm trước và trao đổi nhanh trên nhóm khi có thay đổi.',
  },
];
