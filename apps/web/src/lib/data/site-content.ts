import {
  BookOpen,
  FileText,
  HelpCircle,
  Home,
  LifeBuoy,
  type LucideIcon,
  Newspaper,
  Users,
} from "lucide-react";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  tags: string[];
};

export const team: TeamMember[] = [
  {
    name: "Minh Trần",
    role: "Founder · Product Engineer",
    bio: "Xuất phát từ backend ngân hàng, rời đi vì tin rằng phần mềm Việt xứng đáng có bản sắc riêng. Chịu trách nhiệm kiến trúc và lời hứa cuối cùng với khách hàng.",
    tags: ["Node.js", "PostgreSQL", "Architecture"],
  },
  {
    name: "An Lê",
    role: "Design Lead",
    bio: "Theo đuổi editorial typography và motion có chủ đích. Dị ứng với mọi thứ trông giống template, kể cả khi nó đang là xu hướng.",
    tags: ["UI/UX", "Design System", "Motion"],
  },
  {
    name: "Khoa Phạm",
    role: "Fullstack Engineer",
    bio: "Viết Next.js ban ngày, React Native ban đêm. Ám ảnh bởi điểm Lighthouse và việc xóa code thừa hơn là viết thêm code mới.",
    tags: ["Next.js", "React Native", "Tailwind"],
  },
  {
    name: "Vy Nguyễn",
    role: "DevOps & Platform",
    bio: "Tin rằng deploy phải nhàm chán: CI/CD, monitoring, backup đều tự động. Nếu phải làm thủ công một lần, lần sau sẽ có script.",
    tags: ["Docker", "CI/CD", "Observability"],
  },
];

export type NewsPost = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const news: NewsPost[] = [
  {
    slug: "bai-hoc-shared-ui-qua-som",
    date: "2026-02-10",
    tag: "Engineering",
    title: "Vì sao chúng tôi dừng xây shared UI package quá sớm",
    excerpt:
      "Bài học từ lần cố gắng dựng một design system chung cho năm surface khi chưa có nổi một sản phẩm chạy thật.",
    body: [
      "Năm ngoái chúng tôi bắt đầu hệ sinh thái povixa bằng cách sai nhất có thể: dựng packages/ui, packages/tokens, packages/fonts trước khi viết bất kỳ màn hình nào. Kết quả là ba tuần cấu hình exports, transpile, Tailwind source cho monorepo — và zero giá trị cho khách hàng.",
      "Điều chúng tôi nhận ra: design system là kết tinh của quyết định đã được kiểm chứng bằng sản phẩm thật, không phải bản vẽ đẹp trên Figma. Khi chưa có sản phẩm, mọi token đều là phỏng đoán.",
      "Cách làm hiện tại: mỗi surface tự chủ UI trong giai đoạn đầu; chỉ extract component khi có ít nhất hai nơi cần dùng giống nhau và việc copy-paste bắt đầu gây đau. Auth và user service thì tập trung ngay từ đầu, vì đó không phải chuyện thẩm mỹ mà là chuyện an toàn.",
      "Kết quả: web ra bản đầu sau một tuần, admin nối sau ba ngày, và design system thật sự chỉ xuất hiện khi nó có lý do tồn tại.",
    ],
  },
  {
    slug: "editorial-typography-tieng-viet",
    date: "2026-01-28",
    tag: "Design",
    title: "Editorial typography cho tiếng Việt: dấu, nhịp và khoảng thở",
    excerpt:
      "Tiếng Việt có thanh điệu và dấu nặng; chọn font sai, line-height sai là hỏng cả trải nghiệm đọc.",
    body: [
      "Phần lớn font display đẹp trên Dribbble vỡ trận khi gặp tiếng Việt: dấu hỏi chạm nhau, chữ ệ chạm dòng dưới, tracking âm làm dấu nặng dính vào chữ kế bên.",
      "Quy tắc kiểm tra của chúng tôi trước khi chọn bất kỳ font nào: gõ ba câu có đủ dấu nặng, ngã, hỏi và các chữ ươ, ê, ô ở size hiển thị thật. Nếu phải nheo mắt, loại.",
      "Với body text, line-height cho tiếng Việt cần rộng hơn tiếng Anh khoảng 0.1–0.15 vì chiều cao dấu. Với heading, tracking âm phải dừng sớm hơn để dấu không va chạm.",
      "Đó là lý do mọi trang của povixa đều đi qua một bài test gõ trước khi đi qua bài test đẹp.",
    ],
  },
  {
    slug: "auth-tap-trung-da-surface",
    date: "2026-01-12",
    tag: "Engineering",
    title: "Auth tập trung cho hệ sinh thái đa surface",
    excerpt:
      "Một user, một phiên, năm surface: cách tổ chức auth/user service mà không rơi vào địa ngục monorepo.",
    body: [
      "Hệ sinh thái povixa có web, admin, docs, support và legal. Sai lầm phổ biến là mỗi app tự implement login: năm chỗ lưu token, năm kiểu hết hạn, và không ai biết user là ai ở đâu.",
      "Chúng tôi tách auth thành một service duy nhất: cấp phiên, revoke, refresh, role. Các surface chỉ nói chuyện qua API và chia sẻ đúng một contract session.",
      "UI thì ngược lại: mỗi surface tự render form theo ngữ cảnh của nó. Admin cần nhanh và chắc; web cần đẹp và thuyết phục; support cần đơn giản. Ép chung một component login cho cả ba là hy sinh cả ba.",
      "Nguyên tắc rút ra: share những thứ sai một ly là thảm họa (auth, user, permission); để riêng những thứ sai một ly chỉ là xấu (UI).",
    ],
  },
  {
    slug: "tong-ket-2025-hoc-cach-noi-khong",
    date: "2025-12-30",
    tag: "Studio",
    title: "Tổng kết 2025: năm chúng tôi học cách nói không",
    excerpt:
      "Từ chối template, từ chối hứa khống, từ chối cả những dự án không hợp — và đó là quyết định đúng nhất năm.",
    body: [
      "2025 dạy chúng tôi rằng doanh thu đến từ việc nhận mọi dự án là doanh thu mượn từ tương lai: nợ kỹ thuật, nợ niềm tin, nợ sức khỏe đội ngũ.",
      "Ba lời từ chối đáng nhớ nhất: một dự án yêu cầu giao trong hai tuần với phạm vi sáu tuần; một yêu cầu clone nguyên xi giao diện đối thủ; và một hợp đồng mà khách không thể nói rõ vấn đề mình muốn giải quyết.",
      "Ba lời đồng ý đáng nhớ nhất đều bắt đầu bằng một câu hỏi rõ ràng: vấn đề này tốn của bạn bao nhiêu tiền mỗi tháng?",
      "Sang 2026, tiêu chí nhận dự án của povixa vẫn vậy: hiểu được vấn đề, đo được kết quả, và được phép làm khác đi.",
    ],
  },
];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "povixa nhận dự án quy mô nào?",
    a: "Từ landing page một tuần đến hệ sinh thái đa surface 12 tuần. Điểm chung không phải quy mô mà là sự rõ ràng: bạn biết vấn đề cần giải, và đồng ý rằng giải pháp có thể khác đề xuất ban đầu.",
  },
  {
    q: "Quy trình báo giá diễn ra ra sao?",
    a: "Trao đổi 30 phút không phí → chúng tôi gửi phạm vi + ước lượng nỗ lực theo từng milestone → báo giá cố định theo milestone, không theo giờ. Phát sinh phạm vi sẽ được báo trước khi làm, không sau.",
  },
  {
    q: "Có bảo hành sau bàn giao không?",
    a: "30 ngày sửa lỗi miễn phí cho mọi thứ đã bàn giao, kèm tài liệu vận hành và walkthrough video. Sau đó có gói maintain tùy chọn theo tháng, không bắt buộc.",
  },
  {
    q: "Đội ngũ làm việc remote hay onsite?",
    a: "100% remote. Cập nhật async vào thứ năm hằng tuần, demo milestone qua call có ghi hình. Bạn luôn thấy tiến độ thật trên staging, không qua báo cáo tô màu.",
  },
  {
    q: "Quyền sở hữu code thuộc về ai?",
    a: "Thuộc về bạn, toàn bộ, ngay khi milestone cuối được thanh toán: source code, tài khoản hạ tầng, domain, thiết kế nguồn. Chúng tôi chỉ xin phép giữ case study nếu bạn đồng ý bằng văn bản.",
  },
];

export type SearchEntry = {
  title: string;
  group: string;
  href: string;
  keywords: string;
  external?: boolean;
  icon: LucideIcon;
};

export const searchIndex: SearchEntry[] = [
  {
    title: "Trang chủ",
    group: "Trang",
    href: "/",
    keywords: "home trang chủ năng lực quy trình",
    icon: Home,
  },
  {
    title: "Studio & thành viên",
    group: "Trang",
    href: "/about",
    keywords: "about đội ngũ thành viên team câu chuyện",
    icon: Users,
  },
  {
    title: "Tin tức",
    group: "Trang",
    href: "/news",
    keywords: "news blog bài viết tin tức",
    icon: Newspaper,
  },
  {
    title: "Hỗ trợ & FAQ",
    group: "Trang",
    href: "/support",
    keywords: "support help faq trợ giúp câu hỏi",
    icon: LifeBuoy,
  },
  {
    title: "Liên hệ & báo giá",
    group: "Trang",
    href: "/contact",
    keywords: "contact liên hệ báo giá email",
    icon: FileText,
  },
  {
    title: "Tài liệu kỹ thuật",
    group: "Hệ thống",
    href: "https://docs.povixa.cloud",
    keywords: "docs tài liệu api hướng dẫn",
    external: true,
    icon: BookOpen,
  },
  {
    title: "Trung tâm trợ giúp",
    group: "Hệ thống",
    href: "https://support.povixa.cloud",
    keywords: "helpdesk ticket trợ giúp",
    external: true,
    icon: LifeBuoy,
  },
  ...news.map((n) => ({
    title: n.title,
    group: `Tin tức · ${n.tag}`,
    href: `/news/${n.slug}`,
    keywords: n.excerpt,
    icon: Newspaper as LucideIcon,
  })),
  ...faq.map((f) => ({
    title: f.q,
    group: "FAQ",
    href: "/support",
    keywords: f.a,
    icon: HelpCircle as LucideIcon,
  })),
];
