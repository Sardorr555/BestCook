package com.bestcook.app.ui.screens

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.bestcook.app.model.CartItem
import com.bestcook.app.ui.navigation.Screen
import com.bestcook.app.viewmodel.CartViewModel

// Static Option Lists matching the Web App
private val mainItems = listOf(
    FastFoodItem("burger", "Gamburger (Burger)", "🍔", 28000, 520, listOf("Gluten", "Sut"), "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"),
    FastFoodItem("pizza", "Pizza", "🍕", 65000, 950, listOf("Gluten", "Sut"), "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"),
    FastFoodItem("hotdog", "Hot-dog", "🌭", 18000, 380, listOf("Gluten", "Sut"), "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80")
)

private val ingredients = listOf(
    Ingredient("beef", "Mol go'shti kotleti (Beef)", 12000, 220, "meat"),
    Ingredient("chicken", "Tovuq go'shti (Chicken)", 10000, 150, "meat"),
    Ingredient("cheese", "Pishloq (Cheese)", 5000, 80, "dairy", "Sut"),
    Ingredient("lettuce", "Salat bargi (Lettuce)", 2000, 5, "veggie"),
    Ingredient("tomato", "Pomidor (Tomato)", 2000, 10, "veggie"),
    Ingredient("onion", "Piyoz (Onion)", 1000, 8, "veggie"),
    Ingredient("sauce", "Maxsus sous (Sauce)", 3000, 45, "sauce"),
    Ingredient("jalapeno", "Jalapenyo achchiq qalampiri", 4000, 12, "veggie"),
    Ingredient("mushrooms", "Qo'ziqorin (Mushrooms)", 5000, 22, "veggie"),
    Ingredient("pepperoni", "Pepperoni kolbasasi", 8000, 110, "meat")
)

data class FastFoodItem(val id: String, val label: String, val emoji: String, val basePrice: Int, val baseCalories: Int, val allergens: List<String>, val imageUrl: String)
data class Ingredient(val id: String, val label: String, val price: Int, val calories: Int, val category: String, val allergen: String? = null)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FastFoodConstructorScreen(
    navController: NavController,
    cartViewModel: CartViewModel
) {
    var selectedBase by remember { mutableStateOf(mainItems[0]) }
    val activeIngredients = remember { mutableStateListOf<String>("beef", "cheese", "lettuce", "tomato", "sauce") }

    // Dynamic calculations
    val totalCalories = remember(selectedBase, activeIngredients.size) {
        var cal = selectedBase.baseCalories
        activeIngredients.forEach { ingId ->
            val ing = ingredients.find { it.id == ingId }
            if (ing != null) cal += ing.calories
        }
        cal
    }

    val totalWeight = remember(activeIngredients.size) {
        300 + activeIngredients.size * 25
    }

    val finalPrice = remember(selectedBase, activeIngredients.size) {
        var price = selectedBase.basePrice
        activeIngredients.forEach { ingId ->
            val ing = ingredients.find { it.id == ingId }
            if (ing != null) price += ing.price
        }
        price
    }

    val activeAllergens = remember(selectedBase, activeIngredients.size) {
        val list = selectedBase.allergens.toMutableList()
        activeIngredients.forEach { ingId ->
            val ing = ingredients.find { it.id == ingId }
            if (ing?.allergen != null && !list.contains(ing.allergen)) {
                list.add(ing.allergen)
            }
        }
        list
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("🍔 Fast Food Konstruktori", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background)
        ) {
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                // Image preview of current base
                Card(
                    shape = RoundedCornerShape(16.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                    modifier = Modifier.fillMaxWidth().height(180.dp)
                ) {
                    Box(modifier = Modifier.fillMaxSize()) {
                        AsyncImage(
                            model = selectedBase.imageUrl,
                            contentDescription = selectedBase.label,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(
                                    Brush.verticalGradient(
                                        colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.6f))
                                    )
                                )
                        )
                        Text(
                            text = "${selectedBase.emoji} O'z ${selectedBase.label.split(" ")[0]}ingizni Yarating",
                            color = Color.White,
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.align(Alignment.BottomStart).padding(16.dp)
                        )
                    }
                }

                // Nutrition and calories Card
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 0.5.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "🔥 Ozuqaviy qiymat",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Row(modifier = Modifier.fillMaxWidth()) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text("Kaloriyalar", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
                                Text("$totalCalories kkal", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            }
                            Column(modifier = Modifier.weight(1f)) {
                                Text("Og'irligi (Taxminiy)", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
                                Text("$totalWeight g", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            }
                        }
                        if (activeAllergens.isNotEmpty()) {
                            Spacer(modifier = Modifier.height(12.dp))
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(Color(0xFFFFEBEE), shape = RoundedCornerShape(8.dp))
                                    .padding(8.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Default.Info,
                                        contentDescription = "Allergens",
                                        tint = Color(0xFFE53935),
                                        modifier = Modifier.size(16.dp)
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = "Tarkibida allergenlar: ${activeAllergens.joinToString(", ")}",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = Color(0xFFE53935),
                                        fontWeight = FontWeight.SemiBold
                                    )
                                }
                            }
                        }
                    }
                }

                // 1. Food Base Selection
                Column {
                    Text("1. Fast food turini tanlang", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, modifier = Modifier.padding(bottom = 8.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        mainItems.forEach { item ->
                            val isSelected = selectedBase.id == item.id
                            Card(
                                modifier = Modifier
                                    .weight(1f)
                                    .clickable {
                                        selectedBase = item
                                        // Reset base ingredients
                                        activeIngredients.clear()
                                        when (item.id) {
                                            "pizza" -> activeIngredients.addAll(listOf("cheese", "sauce", "mushrooms", "pepperoni"))
                                            "hotdog" -> activeIngredients.addAll(listOf("cheese", "sauce"))
                                            else -> activeIngredients.addAll(listOf("beef", "cheese", "lettuce", "tomato", "sauce"))
                                        }
                                    },
                                shape = RoundedCornerShape(12.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
                                ),
                                border = BorderStroke(
                                    width = if (isSelected) 1.5.dp else 1.dp,
                                    color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
                                )
                            ) {
                                Column(
                                    modifier = Modifier.padding(8.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text(item.emoji, fontSize = 24.sp)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = item.label.split(" ")[0],
                                        style = MaterialTheme.typography.labelMedium,
                                        fontWeight = FontWeight.Bold,
                                        color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onBackground
                                    )
                                }
                            }
                        }
                    }
                }

                // 2. Ingredients Check list
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("2. Masalliqlarni sozlash", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, modifier = Modifier.padding(bottom = 4.dp))
                    ingredients.forEach { ing ->
                        val isChecked = activeIngredients.contains(ing.id)
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    if (isChecked) activeIngredients.remove(ing.id) else activeIngredients.add(ing.id)
                                },
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = if (isChecked) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
                            ),
                            border = BorderStroke(
                                width = if (isChecked) 1.5.dp else 1.dp,
                                color = if (isChecked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
                            )
                        ) {
                            Row(
                                modifier = Modifier.padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Checkbox(
                                        checked = isChecked,
                                        onCheckedChange = {
                                            if (isChecked) activeIngredients.remove(ing.id) else activeIngredients.add(ing.id)
                                        }
                                    )
                                    Column {
                                        Row(verticalAlignment = Alignment.CenterVertically) {
                                            Text(ing.label, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold)
                                            if (ing.allergen != null) {
                                                Spacer(modifier = Modifier.width(6.dp))
                                                Box(
                                                    modifier = Modifier
                                                        .background(Color(0xFFFFEBEE), shape = RoundedCornerShape(4.dp))
                                                        .padding(horizontal = 4.dp, vertical = 2.dp)
                                                ) {
                                                    Text(ing.allergen, fontSize = 9.sp, color = Color(0xFFE53935), fontWeight = FontWeight.Bold)
                                                }
                                            }
                                        }
                                        Text("+${ing.calories} kkal", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
                                    }
                                }
                                Text(
                                    text = "+${ing.price.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                                    style = MaterialTheme.typography.titleSmall,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isChecked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onBackground
                                )
                            }
                        }
                    }
                }
            }

            // Bottom bar
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Umumiy narx:", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
                        Text(
                            text = "${finalPrice.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                            style = MaterialTheme.typography.titleLarge.copy(color = MaterialTheme.colorScheme.primary),
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Button(
                        onClick = {
                            val activeLabels = activeIngredients.map { ingId -> ingredients.find { it.id == ingId }?.label ?: ingId }
                            val detailsStr = "Energiya: $totalCalories kkal | Tarkibi: ${activeLabels.joinToString(", ")}"
                            val cartItem = CartItem(
                                id = "custom_fastfood_" + System.currentTimeMillis(),
                                name = "Maxsus ${selectedBase.label.split(" ")[0]}",
                                details = detailsStr,
                                price = finalPrice,
                                quantity = 1,
                                imageEmoji = selectedBase.emoji,
                                allergens = activeAllergens.toList()
                            )
                            cartViewModel.addToCart(cartItem)
                            navController.navigate(Screen.Cart.route)
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                        shape = RoundedCornerShape(50),
                        contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp)
                    ) {
                        Icon(imageVector = Icons.Default.ShoppingCart, contentDescription = "Add")
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Savatga qo'shish", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}
