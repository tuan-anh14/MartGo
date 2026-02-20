import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { User } from './account/user/entities/user.entity';
import { Buyer } from './account/buyer/entities/buyer.entity';
import { Seller } from './account/seller/entities/seller.entity';
import { Product } from './product/entities/product.entity';
import { Review } from './review/entities/review.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/order-item.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { UserRole } from './lib/supabase';
import { SellerStats } from './seller-stats/entities/seller-stats.entity';
import { OrderStatus } from './shared/enums';

config({ path: resolve(__dirname, '../.env') });

const USERS = [
  {
    name: 'Nguyễn Văn An',
    email: 'buyer@foodee.com',
    password: '123456',
    role: UserRole.BUYER,
    avatar: null,
    address: '123 Nguyễn Văn Cừ, Phường 3, Quận 5, TP.HCM',
    phone: '0912345678',
  },
  {
    name: 'Lê Văn Cường',
    email: 'cuong@foodee.com',
    password: '123456',
    role: UserRole.BUYER,
    avatar: null,
    address: '456 Trần Hưng Đạo, Phường Bến Nghé, Quận 1, TP.HCM',
    phone: '0987654321',
  },
  {
    name: 'Nguyễn Thị Mai',
    email: 'mai@foodee.com',
    password: '123456',
    role: UserRole.BUYER,
    avatar: null,
    address: '789 Lê Văn Việt, Phường Tăng Nhơn Phú A, TP.Thủ Đức',
    phone: '0918765432',
  },
  {
    name: 'Trần Văn Minh',
    email: 'minh@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '45 Chợ Bến Thành, Quận 1, TP.HCM',
    phone: '0901111111',
    sellerInfo: {
      shopName: 'Tạp Hóa Minh Phát',
      description:
        'Tạp hóa truyền thống với đầy đủ các mặt hàng thiết yếu hàng ngày.',
    },
  },
  {
    name: 'Lê Thị Hương',
    email: 'huong@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '123 Chợ Tân Định, Quận 1, TP.HCM',
    phone: '0902222222',
    sellerInfo: {
      shopName: 'Thực Phẩm Sạch Hương',
      description:
        'Chuyên cung cấp rau củ quả tươi, thịt cá sạch từ nông trại.',
    },
  },
  {
    name: 'Phạm Văn Đức',
    email: 'duc@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '789 Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
    phone: '0903333333',
    sellerInfo: {
      shopName: 'Siêu Thị Mini Đức Long',
      description:
        'Siêu thị mini với đầy đủ mặt hàng tiêu dùng, giá cả hợp lý.',
    },
  },
  {
    name: 'Nguyễn Thị Lan',
    email: 'lan@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '234 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '0904444444',
    sellerInfo: {
      shopName: 'Cửa Hàng Gia Dụng Lan Anh',
      description:
        'Chuyên bán đồ gia dụng, vệ sinh nhà cửa với chất lượng tốt.',
    },
  },
  {
    name: 'Trần Thanh Tùng',
    email: 'tung@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '567 Pasteur, Quận 1, TP.HCM',
    phone: '0905555555',
    sellerInfo: {
      shopName: 'Thực Phẩm Nhập Khẩu Tùng',
      description: 'Chuyên thực phẩm nhập khẩu cao cấp, đồ uống ngoại.',
    },
  },
  {
    name: 'Võ Thị Kim',
    email: 'kim@foodee.com',
    password: '123456',
    role: UserRole.SELLER,
    avatar: null,
    address: '890 Cách Mạng Tháng 8, Quận 10, TP.HCM',
    phone: '0906666666',
    sellerInfo: {
      shopName: 'Trang Trại Sữa Kim',
      description: 'Chuyên các sản phẩm từ sữa tươi, trứng gà nuôi tự nhiên.',
    },
  },
];

const PRODUCTS = [
  {
    name: 'Dầu đậu nành Simply (1 lít)',
    description:
      'Dầu đậu nành Simply 100% tinh khiết, không cholesterol, tốt cho sức khỏe tim mạch',
    price: 42000,
    categoryName: 'Gia vị',
    stock: 90,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product1.jpg',
  },
  {
    name: 'Đường tinh luyện Biên Hòa Pure (1kg)',
    description:
      'Đường tinh luyện Biên Hòa Pure tinh khiết tự nhiên, hạt mịn tan nhanh',
    price: 28000,
    categoryName: 'Lương thực',
    stock: 80,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product2.png',
  },
  {
    name: 'Chảo chống dính 28cm',
    description:
      'Chảo chống dính cao cấp size 28cm, đáy từ 3 lớp, phù hợp mọi loại bếp',
    price: 250000,
    categoryName: 'Đồ gia dụng',
    stock: 25,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product3.jpeg',
  },
  {
    name: 'Đậu đỏ loại 1 (500g)',
    description:
      'Đậu đỏ hạt to đều, màu đỏ tươi, dùng nấu chè, làm bánh, giàu dinh dưỡng',
    price: 45000,
    categoryName: 'Lương thực',
    stock: 80,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product4.jpg',
  },
  {
    name: 'Nước mắm Phú Quốc (500ml)',
    description:
      'Nước mắm Phú Quốc truyền thống độ đạm 40 độ đạm, hương vị đậm đà',
    price: 75000,
    categoryName: 'Gia vị',
    stock: 50,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product5.jpg',
  },
  {
    name: 'Bột mì đa dụng Meizan (1kg)',
    description:
      'Bột mì đa dụng cao cấp Meizan, làm bánh mì, bánh ngọt, bánh pizza',
    price: 35000,
    categoryName: 'Lương thực',
    stock: 60,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product6.jpg',
  },
  {
    name: 'Xà phòng diệt khuẩn Lifebuoy (90g x 4)',
    description:
      'Xà phòng Lifebuoy diệt khuẩn 99.9%, bảo vệ da khỏi vi khuẩn, combo 4 bánh',
    price: 28000,
    categoryName: 'Đồ dùng vệ sinh',
    stock: 60,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product7.jpeg',
  },
  {
    name: 'Tương ớt Chinsu (500g)',
    description: 'Tương ớt Chinsu cay ngọt đậm đà, hương vị đặc trưng Việt Nam',
    price: 32000,
    categoryName: 'Gia vị',
    stock: 70,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product8.jpg',
  },
  {
    name: 'Dao thái cao cấp Elmich (20cm)',
    description:
      'Dao thái cao cấp Elmich Diamond, lưỡi dao sắc bén, cán cầm êm tay',
    price: 195000,
    categoryName: 'Đồ gia dụng',
    stock: 35,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product9.jpg',
  },
  {
    name: 'Hộp đựng thực phẩm (bộ 5 chiếc)',
    description:
      'Bộ 5 hộp đựng thực phẩm nhựa PP an toàn, kín khí, bảo quản thực phẩm tươi lâu',
    price: 125000,
    categoryName: 'Đồ gia dụng',
    stock: 30,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product10.jpeg',
  },
  {
    name: 'Bình đựng nước 2.5L',
    description: 'Bình đựng nước nhựa trong suốt 2.5L, có vòi rót tiện lợi',
    price: 85000,
    categoryName: 'Đồ gia dụng',
    stock: 40,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product11.jpeg',
  },
  {
    name: 'Giấy vệ sinh Paseo (6 cuộn)',
    description: 'Giấy vệ sinh Paseo Elegant 3 lớp siêu mềm, thấm hút tốt',
    price: 45000,
    categoryName: 'Đồ dùng vệ sinh',
    stock: 50,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product12.jpeg',
  },
  {
    name: 'Bột giặt Omo (6kg)',
    description:
      'Bột giặt Omo hệ bọt thông minh, khử mùi và diệt khuẩn vượt trội',
    price: 185000,
    categoryName: 'Đồ dùng vệ sinh',
    stock: 30,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product13.jpg',
  },
  {
    name: 'Gạo ST25 túi 5kg',
    description:
      'Gạo ST25 đặc sản Sóc Trăng thơm dẻo tự nhiên, gạo ngon nhất thế giới 2019',
    price: 180000,
    categoryName: 'Lương thực',
    stock: 100,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product14.jpg',
  },
  {
    name: 'Sữa đặc có đường Ông Thọ (380g)',
    description:
      'Sữa đặc Ông Thọ có đường Vinamilk, vị ngọt thơm béo, pha cà phê tuyệt vời',
    price: 25000,
    categoryName: 'Lương thực',
    stock: 50,
    sellerEmail: 'kim@foodee.com',
    imageUrl: '/product/product15.jpg',
  },
  {
    name: 'Sữa chua và Yogurt Vinamilk (combo 4 hộp)',
    description:
      'Combo sữa chua và yogurt Vinamilk lên men tự nhiên, tốt cho tiêu hóa',
    price: 32000,
    categoryName: 'Lương thực',
    stock: 60,
    sellerEmail: 'kim@foodee.com',
    imageUrl: '/product/product16.jpeg',
  },
  {
    name: 'Trứng gà ta tươi (10 quả)',
    description:
      'Trứng gà ta nuôi thả vườn tự nhiên 100%, giàu dinh dưỡng, an toàn',
    price: 45000,
    categoryName: 'Lương thực',
    stock: 100,
    sellerEmail: 'kim@foodee.com',
    imageUrl: '/product/product17.jpg',
  },
  {
    name: 'Sữa tươi Vinamilk 100% (1 lít)',
    description:
      'Sữa tươi Vinamilk 100% không đường, bổ sung canxi và vitamin D',
    price: 32000,
    categoryName: 'Lương thực',
    stock: 80,
    sellerEmail: 'kim@foodee.com',
    imageUrl: '/product/product18.jpeg',
  },
  {
    name: 'Hạt nêm Knorr thịt thăn (400g)',
    description:
      'Hạt nêm Knorr từ thịt thăn, xương ống và tủy, tăng vị ngon tự nhiên',
    price: 42000,
    categoryName: 'Gia vị',
    stock: 70,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product19.jpg',
  },
  {
    name: 'Nước rửa chén Sunlight (800ml)',
    description:
      'Nước rửa chén Sunlight Extra khử mùi tanh với trà xanh Matcha Nhật Bản',
    price: 35000,
    categoryName: 'Đồ dùng vệ sinh',
    stock: 70,
    sellerEmail: 'lan@foodee.com',
    imageUrl: '/product/product20.png',
  },
  {
    name: 'Cơm hộp Bento Nhật Bản',
    description:
      'Cơm hộp Bento kiểu Nhật với thịt cuộn rau củ, trứng và rau sạch, đông lạnh tiện lợi',
    price: 55000,
    categoryName: 'Thực phẩm chế biến',
    stock: 30,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product21.jpeg',
  },
  {
    name: 'Cháo tươi SG Food (240g)',
    description:
      'Cháo tươi SG Food sườn non nấu đậu, ăn liền tiện lợi, chỉ cần hâm nóng',
    price: 18000,
    categoryName: 'Thực phẩm chế biến',
    stock: 60,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product22.png',
  },
  {
    name: 'Mì ly Hảo Hảo (thùng 24 ly)',
    description: 'Mì ly Hảo Hảo vị tôm chua cay Handy, thùng 24 ly tiện lợi',
    price: 135000,
    categoryName: 'Thực phẩm chế biến',
    stock: 45,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product23.jpg',
  },
  {
    name: 'Muối i-ốt Bạc Liêu (500g)',
    description:
      'Muối i-ốt Bạc Liêu tinh khiết, bổ sung i-ốt tự nhiên, phòng bệnh bướu cổ',
    price: 8000,
    categoryName: 'Gia vị',
    stock: 100,
    sellerEmail: 'minh@foodee.com',
    imageUrl: '/product/product24.jpg',
  },
  {
    name: "Snack Lay's vị tảo biển Nori (56g)",
    description:
      "Snack khoai tây Lay's vị tảo biển Nori độc đáo, giòn tan thơm ngon",
    price: 18000,
    categoryName: 'Bánh kẹo',
    stock: 80,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product25.jpg',
  },
  {
    name: 'Chocolate KitKat (45g)',
    description:
      'Chocolate KitKat giòn tan với lớp wafer nhiều lớp phủ socola sữa',
    price: 15000,
    categoryName: 'Bánh kẹo',
    stock: 50,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product26.jpeg',
  },
  {
    name: 'Kẹo dẻo Haribo Goldbären (200g)',
    description:
      'Kẹo dẻo Haribo Goldbären hình gấu vàng nhập khẩu Đức, nhiều hương vị trái cây',
    price: 85000,
    categoryName: 'Bánh kẹo',
    stock: 40,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product27.jpeg',
  },
  {
    name: 'Bánh quy Cosy Marie (240g)',
    description:
      'Bánh quy sữa Cosy Marie giòn tan thơm bơ, hộp 10 gói tiện lợi',
    price: 48000,
    categoryName: 'Bánh kẹo',
    stock: 60,
    sellerEmail: 'duc@foodee.com',
    imageUrl: '/product/product28.jpg',
  },
  {
    name: 'Rượu vang đỏ Ochoa Gran Reserva',
    description:
      'Rượu vang đỏ Tây Ban Nha Ochoa 10 Gran Reserva cao cấp, độ cồn 13.5%',
    price: 450000,
    categoryName: 'Đồ uống',
    stock: 15,
    sellerEmail: 'tung@foodee.com',
    imageUrl: '/product/product29.png',
  },
  {
    name: 'Nước suối Lavie (1 lít)',
    description:
      'Nước suối Lavie 1 lít tinh khiết, nguồn nước thiên nhiên sạch',
    price: 6000,
    categoryName: 'Đồ uống',
    stock: 150,
    sellerEmail: 'tung@foodee.com',
    imageUrl: '/product/product30.jpg',
  },
  {
    name: 'Bia Heineken thùng 24 lon',
    description: 'Bia Heineken nhập khẩu chính hãng 330ml, thùng 24 lon',
    price: 620000,
    categoryName: 'Đồ uống',
    stock: 25,
    sellerEmail: 'tung@foodee.com',
  },
  {
    name: 'Nước ngọt Coca Cola (6 lon)',
    description: 'Nước ngọt Coca Cola 330ml, lốc 6 lon',
    price: 45000,
    categoryName: 'Đồ uống',
    stock: 100,
    sellerEmail: 'tung@foodee.com',
  },
  {
    name: 'Trà xanh không độ C2 (500ml)',
    description: 'Trà xanh không độ C2 hương chanh sả, không đường, không calo',
    price: 8000,
    categoryName: 'Đồ uống',
    stock: 120,
    sellerEmail: 'tung@foodee.com',
  },
];

const REVIEW_COMMENTS = {
  5: [
    'Sản phẩm rất tốt, đóng gói cẩn thận. Sẽ mua lại!',
    'Chất lượng tuyệt vời, giao hàng nhanh.',
    'Rất hài lòng, đúng mô tả. 10 điểm!',
    'Xuất sắc! Giá rẻ mà chất lượng cao.',
  ],
  4: [
    'Sản phẩm tốt, chỉ hơi chậm giao.',
    'Chất lượng ổn, giá hợp lý.',
    'Khá ưng ý, sẽ quay lại ủng hộ.',
    'Sản phẩm đẹp, đóng gói kỹ.',
  ],
  3: [
    'Tạm được, chất lượng bình thường.',
    'Sản phẩm OK, không có gì đặc biệt.',
    'Dùng được, nhưng kỳ vọng hơn.',
  ],
  2: ['Chất lượng không như mong đợi.', 'Hơi thất vọng, bao bì không đẹp.'],
  1: ['Sản phẩm kém chất lượng, không nên mua.'],
};

async function seed() {
  console.log('🌱 Starting database seeding...');
  console.log('🔍 Environment check:');
  console.log(
    'SUPABASE_URL:',
    process.env.SUPABASE_URL ? '✅ Set' : '❌ Not set',
  );
  console.log(
    'SUPABASE_SERVICE_ROLE_KEY:',
    process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Not set',
  );
  console.log(
    'DATABASE_URL:',
    process.env.DATABASE_URL ? '✅ Set' : '❌ Not set',
  );

  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
      User,
      Buyer,
      Seller,
      Product,
      Review,
      Order,
      OrderItem,
      Favorite,
      SellerStats,
    ],
    synchronize: true,
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('🔌 Connected to database');

    const userRepo = dataSource.getRepository(User);
    const buyerRepo = dataSource.getRepository(Buyer);
    const sellerRepo = dataSource.getRepository(Seller);
    const productRepo = dataSource.getRepository(Product);
    const reviewRepo = dataSource.getRepository(Review);
    const orderItemRepo = dataSource.getRepository(OrderItem);
    const orderRepo = dataSource.getRepository(Order);
    const favoriteRepo = dataSource.getRepository(Favorite);
    const sellerStatsRepo = dataSource.getRepository(SellerStats);

    // ─── Clear existing data ────────────────────────────────────────────
    console.log('🗑️  Clearing existing data...');
    await dataSource.query('TRUNCATE TABLE "review" CASCADE');
    await dataSource.query('TRUNCATE TABLE "order_item" CASCADE');
    await dataSource.query('TRUNCATE TABLE "order" CASCADE');
    await dataSource.query('TRUNCATE TABLE "favorite" CASCADE');
    await dataSource.query('TRUNCATE TABLE "product" CASCADE');
    await dataSource.query('TRUNCATE TABLE "seller_stats" CASCADE');
    await dataSource.query('TRUNCATE TABLE "seller" CASCADE');
    await dataSource.query('TRUNCATE TABLE "buyer" CASCADE');
    await dataSource.query('TRUNCATE TABLE "user" CASCADE');
    console.log('   ✅ Cleared all tables');

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const {
      data: { users: existingAuthUsers },
      error: listError,
    } = await supabase.auth.admin.listUsers();
    if (!listError && existingAuthUsers) {
      for (const u of existingAuthUsers) {
        await supabase.auth.admin.deleteUser(u.id);
      }
      console.log(
        `   ✅ Deleted ${existingAuthUsers.length} Supabase Auth users`,
      );
    }
    console.log('✅ All existing data cleared');

    // ─── Seed Users ─────────────────────────────────────────────────────
    console.log('\n👥 Seeding users...');
    const savedUsers: User[] = [];
    const buyerIds: string[] = [];
    const sellerIds: string[] = [];

    for (const userData of USERS) {
      const { sellerInfo, password, ...userFields } = userData;

      try {
        const { data: authData, error: authError } =
          await supabase.auth.admin.createUser({
            email: userData.email,
            password,
            email_confirm: true,
          });

        if (authError || !authData.user) {
          console.warn(
            `   ⚠️ Skipping ${userData.email}: ${authError?.message}`,
          );
          continue;
        }

        const user = userRepo.create({
          id: authData.user.id,
          ...userFields,
          avatar: userFields.avatar === null ? undefined : userFields.avatar,
        });
        const savedUser = await userRepo.save(user);
        savedUsers.push(savedUser);

        if (savedUser.role === UserRole.BUYER) {
          const buyer = buyerRepo.create({ id: savedUser.id });
          await buyerRepo.save(buyer);
          buyerIds.push(savedUser.id);
          console.log(`   ✅ Buyer: ${savedUser.name} (${savedUser.email})`);
        } else if (savedUser.role === UserRole.SELLER && sellerInfo) {
          const seller = sellerRepo.create({
            id: savedUser.id,
            shopName: sellerInfo.shopName,
            description: sellerInfo.description,
          });
          await sellerRepo.save(seller);
          sellerIds.push(savedUser.id);
          console.log(
            `   ✅ Seller: ${savedUser.name} - ${sellerInfo.shopName}`,
          );
        }
      } catch (error) {
        console.error(`   ❌ Error creating user ${userData.email}:`, error);
      }
    }

    // ─── Seed Products ──────────────────────────────────────────────────
    console.log('\n🛍️  Seeding products...');
    const savedProducts: Product[] = [];

    for (const productData of PRODUCTS) {
      const seller = savedUsers.find(
        (u) => u.email === productData.sellerEmail,
      );
      if (!seller) {
        console.warn(
          `   ⚠️ Skipping product ${productData.name} - seller not found`,
        );
        continue;
      }

      const product = productRepo.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: productData.categoryName,
        sellerId: seller.id,
        imageUrl: productData.imageUrl || undefined,
      });
      const saved = await productRepo.save(product);
      savedProducts.push(saved);
    }
    console.log(`   ✅ Created ${savedProducts.length} products`);

    // ─── Seed Reviews ───────────────────────────────────────────────────
    console.log('\n⭐ Seeding reviews...');
    let reviewCount = 0;

    const reviewAssignments = [
      {
        buyerEmail: 'buyer@foodee.com',
        productIndices: [0, 1, 4, 7, 13, 14, 16, 20, 29],
        ratings: [5, 4, 5, 4, 5, 3, 4, 5, 4],
      },
      {
        buyerEmail: 'cuong@foodee.com',
        productIndices: [2, 3, 8, 9, 11, 12, 19, 24, 25, 28],
        ratings: [4, 5, 5, 3, 4, 5, 4, 3, 5, 5],
      },
      {
        buyerEmail: 'mai@foodee.com',
        productIndices: [5, 6, 10, 14, 15, 17, 21, 22, 26, 27, 30, 31],
        ratings: [5, 4, 4, 5, 4, 5, 3, 4, 5, 4, 2, 5],
      },
    ];

    for (const assignment of reviewAssignments) {
      const buyer = savedUsers.find((u) => u.email === assignment.buyerEmail);
      if (!buyer) continue;

      for (let i = 0; i < assignment.productIndices.length; i++) {
        const product = savedProducts[assignment.productIndices[i]];
        if (!product) continue;

        const rating = assignment.ratings[i];
        const comments =
          REVIEW_COMMENTS[rating as keyof typeof REVIEW_COMMENTS];
        const comment = comments[Math.floor(Math.random() * comments.length)];

        const review = reviewRepo.create({
          buyerId: buyer.id,
          productId: product.id,
          rating,
          comment,
          helpfulCount: Math.floor(Math.random() * 10),
        });
        await reviewRepo.save(review);
        reviewCount++;
      }
    }
    console.log(`   ✅ Created ${reviewCount} reviews`);

    // Update product cached stats (averageRating, totalReviews)
    for (const product of savedProducts) {
      const reviews = await reviewRepo.find({
        where: { productId: product.id },
      });
      if (reviews.length > 0) {
        const avgRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await productRepo.update(product.id, {
          averageRating: parseFloat(avgRating.toFixed(2)),
          totalReviews: reviews.length,
        });
      }
    }
    console.log('   ✅ Updated product review stats');

    // ─── Seed Orders & OrderItems ───────────────────────────────────────
    console.log('\n📦 Seeding orders...');
    let orderCount = 0;
    let orderItemCount = 0;

    const daysAgo = (days: number) => {
      const d = new Date();
      d.setDate(d.getDate() - days);
      return d;
    };

    const orderAssignments = [
      {
        buyerEmail: 'buyer@foodee.com',
        orders: [
          {
            status: OrderStatus.PAID,
            note: 'Giao giờ hành chính',
            daysAgo: 15,
            items: [
              { idx: 0, qty: 2 },
              { idx: 4, qty: 1 },
              { idx: 7, qty: 3 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 8,
            items: [
              { idx: 13, qty: 1 },
              { idx: 14, qty: 2 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: 'Gọi trước khi giao',
            daysAgo: 3,
            items: [
              { idx: 16, qty: 2 },
              { idx: 17, qty: 1 },
            ],
          },
          {
            status: OrderStatus.PENDING,
            note: null,
            daysAgo: 0,
            items: [
              { idx: 20, qty: 1 },
              { idx: 21, qty: 3 },
            ],
          },
        ],
      },
      {
        buyerEmail: 'cuong@foodee.com',
        orders: [
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 20,
            items: [
              { idx: 2, qty: 1 },
              { idx: 8, qty: 1 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: 'Để ở bảo vệ nếu vắng',
            daysAgo: 12,
            items: [
              { idx: 3, qty: 2 },
              { idx: 5, qty: 1 },
              { idx: 23, qty: 3 },
            ],
          },
          {
            status: OrderStatus.CANCELLED,
            note: 'Đổi ý không mua nữa',
            daysAgo: 5,
            items: [{ idx: 28, qty: 1 }],
          },
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 2,
            items: [
              { idx: 11, qty: 1 },
              { idx: 12, qty: 1 },
              { idx: 19, qty: 2 },
            ],
          },
          {
            status: OrderStatus.PENDING,
            note: null,
            daysAgo: 0,
            items: [
              { idx: 24, qty: 2 },
              { idx: 25, qty: 3 },
            ],
          },
        ],
      },
      {
        buyerEmail: 'mai@foodee.com',
        orders: [
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 25,
            items: [
              { idx: 5, qty: 2 },
              { idx: 6, qty: 1 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: 'Giao buổi sáng',
            daysAgo: 18,
            items: [
              { idx: 10, qty: 1 },
              { idx: 14, qty: 3 },
              { idx: 15, qty: 2 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 10,
            items: [
              { idx: 21, qty: 2 },
              { idx: 22, qty: 1 },
            ],
          },
          {
            status: OrderStatus.PAID,
            note: null,
            daysAgo: 4,
            items: [
              { idx: 26, qty: 1 },
              { idx: 27, qty: 2 },
            ],
          },
          {
            status: OrderStatus.CANCELLED,
            note: 'Tìm được chỗ rẻ hơn',
            daysAgo: 1,
            items: [{ idx: 29, qty: 6 }],
          },
          {
            status: OrderStatus.PENDING,
            note: 'Giao sau 5h chiều',
            daysAgo: 0,
            items: [
              { idx: 30, qty: 2 },
              { idx: 31, qty: 4 },
            ],
          },
        ],
      },
    ];

    for (const assignment of orderAssignments) {
      const buyer = savedUsers.find((u) => u.email === assignment.buyerEmail);
      if (!buyer) continue;

      for (const orderData of assignment.orders) {
        const items = orderData.items
          .map((item) => {
            const product = savedProducts[item.idx];
            if (!product) return null;
            return { product, quantity: item.qty, price: product.price };
          })
          .filter(Boolean) as {
          product: Product;
          quantity: number;
          price: number;
        }[];

        if (items.length === 0) continue;

        const totalPrice = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const createdAt = daysAgo(orderData.daysAgo);

        const order = orderRepo.create({
          buyerId: buyer.id,
          totalPrice,
          status: orderData.status,
          note: orderData.note ?? undefined,
          createdAt,
          ...(orderData.status === OrderStatus.PAID
            ? {
                paymentReference: `VNP${Date.now()}${Math.floor(Math.random() * 1000)}`,
                paidAt: createdAt,
              }
            : {}),
        });
        const savedOrder = await orderRepo.save(order);
        orderCount++;

        for (const item of items) {
          const orderItem = orderItemRepo.create({
            orderId: savedOrder.id,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.price,
          });
          await orderItemRepo.save(orderItem);
          orderItemCount++;

          // Update totalSold for paid orders
          if (orderData.status === OrderStatus.PAID) {
            await productRepo.increment(
              { id: item.product.id },
              'totalSold',
              item.quantity,
            );
          }
        }
      }
    }
    console.log(
      `   ✅ Created ${orderCount} orders with ${orderItemCount} items`,
    );

    // ─── Seed Favorites ─────────────────────────────────────────────────
    console.log('\n❤️  Seeding favorites...');
    let favoriteCount = 0;

    const favoriteAssignments = [
      {
        buyerEmail: 'buyer@foodee.com',
        productIndices: [0, 4, 7, 13, 14, 16, 28, 29],
      },
      {
        buyerEmail: 'cuong@foodee.com',
        productIndices: [2, 3, 8, 9, 11, 19, 24, 25, 30],
      },
      {
        buyerEmail: 'mai@foodee.com',
        productIndices: [5, 6, 10, 14, 15, 17, 21, 26, 27, 31],
      },
    ];

    for (const assignment of favoriteAssignments) {
      const buyer = savedUsers.find((u) => u.email === assignment.buyerEmail);
      if (!buyer) continue;

      for (const idx of assignment.productIndices) {
        const product = savedProducts[idx];
        if (!product) continue;

        const favorite = favoriteRepo.create({
          buyerId: buyer.id,
          productId: product.id,
        });
        await favoriteRepo.save(favorite);
        favoriteCount++;
      }
    }
    console.log(`   ✅ Created ${favoriteCount} favorites`);

    // ─── Seed SellerStats ───────────────────────────────────────────────
    console.log('\n📊 Seeding seller stats...');

    for (const sellerId of sellerIds) {
      const sellerProducts = savedProducts.filter(
        (p) => p.sellerId === sellerId,
      );
      const productIds = sellerProducts.map((p) => p.id);

      let totalOrders = 0;
      let totalRevenue = 0;
      let pendingOrders = 0;
      let completedOrders = 0;

      if (productIds.length > 0) {
        const orderItems = await orderItemRepo
          .createQueryBuilder('oi')
          .innerJoinAndSelect('oi.order', 'order')
          .where('oi.productId IN (:...productIds)', { productIds })
          .getMany();

        const orderIdSet = new Set<number>();
        for (const oi of orderItems) {
          const order = (oi as OrderItem & { order: Order }).order;
          if (!orderIdSet.has(order.id)) {
            orderIdSet.add(order.id);
            if (order.status === OrderStatus.PAID) {
              completedOrders++;
              totalRevenue += Number(order.totalPrice);
            } else if (order.status === OrderStatus.PENDING) {
              pendingOrders++;
            }
            totalOrders++;
          }
        }
      }

      const reviews = await reviewRepo
        .createQueryBuilder('r')
        .where('r.productId IN (:...ids)', {
          ids: productIds.length > 0 ? productIds : [0],
        })
        .getMany();

      const totalReviews = reviews.length;
      const averageRating =
        totalReviews > 0
          ? parseFloat(
              (
                reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
              ).toFixed(2),
            )
          : 0;

      const stats = sellerStatsRepo.create({
        id: sellerId,
        totalOrders,
        totalRevenue,
        totalProducts: sellerProducts.length,
        pendingOrders,
        completedOrders,
        averageRating,
        totalReviews,
      });
      await sellerStatsRepo.save(stats);

      const sellerUser = savedUsers.find((u) => u.id === sellerId);
      console.log(
        `   ✅ ${sellerUser?.name}: ${totalProducts(sellerProducts)} products, ${totalOrders} orders, ${totalReviews} reviews, ⭐${averageRating}`,
      );
    }

    // ─── Done ───────────────────────────────────────────────────────────
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('═══════════════════════════════════════════');
    console.log('  BUYERS:');
    console.log('    buyer@foodee.com / 123456 (Nguyễn Văn An)');
    console.log('    cuong@foodee.com / 123456 (Lê Văn Cường)');
    console.log('    mai@foodee.com   / 123456 (Nguyễn Thị Mai)');
    console.log('  SELLERS:');
    console.log('    minh@foodee.com  / 123456 (Tạp Hóa Minh Phát)');
    console.log('    huong@foodee.com / 123456 (Thực Phẩm Sạch Hương)');
    console.log('    duc@foodee.com   / 123456 (Siêu Thị Mini Đức Long)');
    console.log('    lan@foodee.com   / 123456 (Cửa Hàng Gia Dụng Lan Anh)');
    console.log('    tung@foodee.com  / 123456 (Thực Phẩm Nhập Khẩu Tùng)');
    console.log('    kim@foodee.com   / 123456 (Trang Trại Sữa Kim)');
    console.log('═══════════════════════════════════════════');
    console.log(
      `\n📊 Summary: ${savedUsers.length} users, ${savedProducts.length} products, ${reviewCount} reviews, ${orderCount} orders, ${favoriteCount} favorites`,
    );
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

function totalProducts(products: Product[]) {
  return products.length;
}

if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seed };
