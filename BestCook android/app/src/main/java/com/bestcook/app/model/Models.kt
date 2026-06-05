package com.bestcook.app.model

data class Category(
    val id: String,
    val title: String,
    val emoji: String,
    val description: String,
    val imageUrl: String
)

data class Seller(
    val id: String,
    val name: String,
    val rating: Float,
    val reviewsCount: Int,
    val avatarUrl: String,
    val specialty: String,
    val bannerUrl: String,
    val location: String
)

data class Product(
    val id: String,
    val name: String,
    val description: String,
    val price: Int,
    val imageUrl: String,
    val rating: Float,
    val categoryId: String,
    val sellerId: String,
    val allergens: List<String> = emptyList()
)

data class CartItem(
    val id: String,
    val name: String,
    val details: String,
    val price: Int,
    val quantity: Int,
    val imageEmoji: String, // 🎂, 🍔, 🍕, etc.
    val allergens: List<String> = emptyList()
)

data class Order(
    val id: String,
    val items: List<CartItem>,
    val totalPrice: Int,
    val customerName: String,
    val phone: String,
    val address: String,
    val status: String, // "Kutilmoqda", "Tayyorlanmoqda", "Yo'lda", "Yetkazildi"
    val timestamp: Long
)

object MockData {
    val categories = listOf(
        Category(
            id = "cakes",
            title = "Tortlar & Shirinliklar",
            emoji = "🎂",
            description = "Siz istagan dizayn va ta\'mdagi maxsus tortlar",
            imageUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
        ),
        Category(
            id = "fastfood",
            title = "Fast Food",
            emoji = "🍔",
            description = "Issiq burgerlar, pitssa va tez tayyor bo\'ladigan taomlar",
            imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
        ),
        Category(
            id = "milliy",
            title = "Milliy Taomlar",
            emoji = "🍲",
            description = "Osh, somsa, manti va boshqa milliy lazzatlar",
            imageUrl = "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80"
        ),
        Category(
            id = "dessert",
            title = "Desertlar",
            emoji = "🧁",
            description = "Kapkeyk, makaron va yengil shirinliklar",
            imageUrl = "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80"
        )
    )

    val sellers = listOf(
        Seller(
            id = "seller_sardor",
            name = "Sardorbek Shoshilinch Shirinliklar",
            rating = 4.9f,
            reviewsCount = 124,
            avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            specialty = "Premium 3D tortlar va pishiriqlar",
            bannerUrl = "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=800&q=80",
            location = "Toshkent sh., Chilonzor"
        ),
        Seller(
            id = "seller_laylo",
            name = "Laylo Opa Taomlari",
            rating = 4.8f,
            reviewsCount = 98,
            avatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
            specialty = "Toshkentcha osh va yupqa go\'shtli somsa",
            bannerUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            location = "Toshkent sh., Yunusobod"
        ),
        Seller(
            id = "seller_bekzod",
            name = "Bekzod Fast-Food Master",
            rating = 4.7f,
            reviewsCount = 76,
            avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            specialty = "Sershira burgerlar va mini pitssalar",
            bannerUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
            location = "Toshkent sh., Yakkasaroy"
        ),
        Seller(
            id = "seller_nigora",
            name = "Nigora Sog\'lom Nonvoyi",
            rating = 5.0f,
            reviewsCount = 45,
            avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            specialty = "Glutensiz va shakarsiz parhez shirinliklar",
            bannerUrl = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
            location = "Toshkent sh., Mirzo Ulug\'bek"
        )
    )

    val products = listOf(
        Product(
            id = "prod_asalli",
            name = "Asalli Klassik Tort",
            description = "Tabiiy asaldan tayyorlangan sershira, yumshoq an\'anaviy asalli tort. Oilaviy bayramlar uchun mos keladi.",
            price = 90000,
            imageUrl = "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80",
            rating = 4.9f,
            categoryId = "cakes",
            sellerId = "seller_sardor",
            allergens = listOf("Asal", "Sut", "Gluten")
        ),
        Product(
            id = "prod_shokolad",
            name = "Shokoladli Truffel Torti",
            description = "Belgiya shokoladidan tayyorlangan quyuq shokoladli korj va shokoladli ganashli shohona taom.",
            price = 140000,
            imageUrl = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
            rating = 4.8f,
            categoryId = "cakes",
            sellerId = "seller_sardor",
            allergens = listOf("Sut", "Gluten", "Tuxum")
        ),
        Product(
            id = "prod_osh",
            name = "Bayramona Toshkent Oshi",
            description = "Qo\'y go\'shti, devzira guruchi, bedana tuxumi va qazi solib pishirilgan haqiqiy toshkentcha bayram oshi.",
            price = 35000,
            imageUrl = "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80",
            rating = 4.9f,
            categoryId = "milliy",
            sellerId = "seller_laylo",
            allergens = emptyList()
        ),
        Product(
            id = "prod_somsa",
            name = "Tandir Go\'shtli Somsa",
            description = "Varaq xamirdan tayyorlangan, maydalangan mol go\'shti va piyozli, tandirda pishirilgan sershira somsa.",
            price = 9000,
            imageUrl = "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=400&q=80",
            rating = 4.7f,
            categoryId = "milliy",
            sellerId = "seller_laylo",
            allergens = listOf("Gluten")
        ),
        Product(
            id = "prod_burger",
            name = "Double Cheddar Burger",
            description = "Ikki karra mol go\'shti kotleti, erigan cheddar pishlog\'i, pomidor va maxsus sousli sershira burger.",
            price = 32000,
            imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
            rating = 4.6f,
            categoryId = "fastfood",
            sellerId = "seller_bekzod",
            allergens = listOf("Sut", "Gluten")
        ),
        Product(
            id = "prod_pizza",
            name = "Pepperoni Motsarella Pizza",
            description = "Yupqa xamirda italyancha pepperoni kolbasalari, sershira motsarella pishlog\'i va maxsus pomidor sousi.",
            price = 68000,
            imageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
            rating = 4.8f,
            categoryId = "fastfood",
            sellerId = "seller_bekzod",
            allergens = listOf("Sut", "Gluten")
        ),
        Product(
            id = "prod_vegan",
            name = "Shirin Meva & Rezavor Parhez Torti",
            description = "Mutlaqo shakarsiz, tabiiy steviya bilan va glutensiz un aralashmasidan tayyorlangan sog\'lom desert.",
            price = 125000,
            imageUrl = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
            rating = 5.0f,
            categoryId = "cakes",
            sellerId = "seller_nigora",
            allergens = emptyList()
        )
    )
}
