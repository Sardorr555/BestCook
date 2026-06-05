package com.bestcook.app.ui.screens

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.bestcook.app.model.CartItem
import com.bestcook.app.ui.navigation.Screen
import com.bestcook.app.viewmodel.CartViewModel

// Static Option Lists matching the Web App
private val shapes = listOf(
    CakeOption("round", "Dumaloq (Round)", "◯", 0),
    CakeOption("square", "To\'rtburchak (Square)", "⬜", 20000),
    CakeOption("heart", "Yurak (Heart)", "❤️", 40000)
)

private val sizes = listOf(
    CakeOption("sm", "Kichik (Small) - 1kg", "4-6 kishi uchun", 120000),
    CakeOption("md", "O\'rtacha (Medium) - 2kg", "8-12 kishi uchun", 220000),
    CakeOption("lg", "Katta (Large) - 3kg+", "15-20 kishi uchun", 320000)
)

private val layersList = listOf(
    CakeLayerOption(1, "1 qavatli (1 Layer)", 1.0f),
    CakeLayerOption(2, "2 qavatli (2 Layers)", 1.6f),
    CakeLayerOption(3, "3 qavatli (3 Layers)", 2.2f)
)

private val flavors = listOf(
    CakeOption("vanilla", "Vanilli", "#FFF8DC", 0),
    CakeOption("chocolate", "Shokoladli", "#3D2314", 15000),
    CakeOption("strawberry", "Qulupnayli", "#FFB6C1", 20000),
    CakeOption("red-velvet", "Qizil Baxmal (Red Velvet)", "#8B0000", 30000),
    CakeOption("pistachio", "Pistali", "#98FB98", 35000)
)

private val creams = listOf(
    CakeOption("cream-cheese", "Cream Cheese", "#FFFDF2", 10000),
    CakeOption("chocolate-ganache", "Shokoladli Ganash", "#3D2314", 25000),
    CakeOption("buttercream", "Sariyog\'li krem", "#FFF4D6", 0),
    CakeOption("whipped-cream", "Kopirtirilgan qaymoq", "#FFFFFF", 5000)
)

private val fillings = listOf(
    CakeOption("none", "Yo\'q", "", 0),
    CakeOption("banana", "Bananli", "", 10000),
    CakeOption("strawberry-jam", "Qulupnayli jem", "", 15000),
    CakeOption("caramel", "Karamel", "", 12000),
    CakeOption("cherry", "Gilosli", "", 18000)
)

private val decors = listOf(
    CakeOption("berries", "Yangi mevalar", "", 40000),
    CakeOption("flowers", "Gullar", "", 50000),
    CakeOption("chocolate-drips", "Shokolad oqimlari", "", 20000),
    CakeOption("gold-leaf", "Oltin zarralari", "", 60000),
    CakeOption("minimalist", "Minimalist yozuv", "", 15000)
)

private val allergens = listOf("nuts" to "Yong'oq", "milk" to "Sut", "eggs" to "Tuxum", "gluten" to "Gluten")

data class CakeOption(val id: String, val label: String, val extra: String, val price: Int)
data class CakeLayerOption(val count: Int, val label: String, val priceMultiplier: Float)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CakeConstructorScreen(
    navController: NavController,
    cartViewModel: CartViewModel
) {
    // Current Selections
    var selectedShape by remember { mutableStateOf(shapes[0]) }
    var selectedSize by remember { mutableStateOf(sizes[1]) }
    var selectedLayers by remember { mutableStateOf(layersList[0]) }
    var selectedFlavor by remember { mutableStateOf(flavors[0]) }
    var selectedCream by remember { mutableStateOf(creams[0]) }
    var selectedFilling by remember { mutableStateOf(fillings[0]) }
    var selectedDecor by remember { mutableStateOf(decors[0]) }
    var customText by remember { mutableStateOf("") }
    var selectedTextColor by remember { mutableStateOf(Color.Black) }
    val selectedAllergens = remember { mutableStateListOf<String>() }

    // Live price calculation
    val finalPrice = remember(selectedShape, selectedSize, selectedLayers, selectedFlavor, selectedCream, selectedFilling, selectedDecor) {
        val base = selectedSize.price + selectedShape.price + selectedFlavor.price + selectedCream.price + selectedFilling.price + selectedDecor.price
        (base * selectedLayers.priceMultiplier).toInt()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("🎂 Tort Konstruktori", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)) },
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
            // Split screen layout for Mobile: Top is Cake Canvas Preview, Bottom is Scrollable Options
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp)
                    .background(Color(0xFFFFFDF9))
                    .padding(8.dp),
                contentAlignment = Alignment.Center
            ) {
                // Interactive 2D/3D Cake Canvas drawing
                CakeVisualizerCanvas(
                    shape = selectedShape.id,
                    layers = selectedLayers.count,
                    flavorColorHex = selectedFlavor.extra,
                    creamColorHex = selectedCream.extra,
                    decorType = selectedDecor.id,
                    text = customText,
                    textColor = selectedTextColor
                )
            }

            Divider(color = MaterialTheme.colorScheme.outlineVariant, thickness = 0.5.dp)

            // Scrollable controls
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                // 1. Shapes
                ControlSection(title = "1. Shaklini tanlang") {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        shapes.forEach { shape ->
                            val isSelected = selectedShape.id == shape.id
                            OptionSelectButton(
                                text = "${shape.extra} ${shape.label.split(" ")[0]}",
                                isSelected = isSelected,
                                modifier = Modifier.weight(1f),
                                onClick = { selectedShape = shape }
                            )
                        }
                    }
                }

                // 2. Sizes
                ControlSection(title = "2. Hajmi va og'irligi") {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        sizes.forEach { size ->
                            val isSelected = selectedSize.id == size.id
                            ListOptionCard(
                                title = size.label,
                                subtitle = size.extra,
                                price = "+${size.price.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                                isSelected = isSelected,
                                onClick = { selectedSize = size }
                            )
                        }
                    }
                }

                // 3. Layers Count
                ControlSection(title = "3. Qavatlar soni") {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        layersList.forEach { layerOption ->
                            val isSelected = selectedLayers.count == layerOption.count
                            OptionSelectButton(
                                text = layerOption.label,
                                isSelected = isSelected,
                                modifier = Modifier.weight(1f),
                                onClick = { selectedLayers = layerOption }
                            )
                        }
                    }
                }

                // 4. Flavor (Sponge color)
                ControlSection(title = "4. Korj ta\'mi (Flavor)") {
                    Row(
                        modifier = Modifier.horizontalScroll(rememberScrollState()),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        flavors.forEach { flavor ->
                            val isSelected = selectedFlavor.id == flavor.id
                            ColorOptionCard(
                                label = flavor.label,
                                hexColor = flavor.extra,
                                isSelected = isSelected,
                                onClick = { selectedFlavor = flavor }
                            )
                        }
                    }
                }

                // 5. Cream Type
                ControlSection(title = "5. Krem turi") {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        creams.forEach { cream ->
                            val isSelected = selectedCream.id == cream.id
                            ListOptionCard(
                                title = cream.label,
                                subtitle = if (cream.price > 0) "+${cream.price} so'm" else "Bepul",
                                price = "",
                                isSelected = isSelected,
                                onClick = { selectedCream = cream }
                            )
                        }
                    }
                }

                // 6. Fillings
                ControlSection(title = "6. Ichki meva/nachinka") {
                    Row(
                        modifier = Modifier.horizontalScroll(rememberScrollState()),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        fillings.forEach { filling ->
                            val isSelected = selectedFilling.id == filling.id
                            ChipSelectButton(
                                text = filling.label,
                                isSelected = isSelected,
                                onClick = { selectedFilling = filling }
                            )
                        }
                    }
                }

                // 7. Decorations
                ControlSection(title = "7. Bezaklar") {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        decors.forEach { decor ->
                            val isSelected = selectedDecor.id == decor.id
                            ListOptionCard(
                                title = decor.label,
                                subtitle = if (decor.price > 0) "+${decor.price} so'm" else "Bepul",
                                price = "",
                                isSelected = isSelected,
                                onClick = { selectedDecor = decor }
                            )
                        }
                    }
                }

                // 8. Custom text
                ControlSection(title = "8. Tort yuzasidagi yozuv") {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = customText,
                            onValueChange = { if (it.length <= 25) customText = it },
                            label = { Text("Tabrik matni (Maks 25 harf)") },
                            modifier = Modifier.fillMaxWidth(),
                            maxLines = 1,
                            singleLine = true,
                            shape = RoundedCornerShape(12.dp)
                        )
                        Row(
                            modifier = Modifier.padding(top = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("Matn rangi: ", style = MaterialTheme.typography.bodyMedium)
                            Spacer(modifier = Modifier.width(8.dp))
                            listOf(Color.Black, Color.Red, Color(0xFFE8622B), Color(0xFF007AFF)).forEach { color ->
                                Box(
                                    modifier = Modifier
                                        .size(30.dp)
                                        .clip(CircleShape)
                                        .background(color)
                                        .border(
                                            width = if (selectedTextColor == color) 2.dp else 0.dp,
                                            color = MaterialTheme.colorScheme.onBackground,
                                            shape = CircleShape
                                        )
                                        .clickable { selectedTextColor = color }
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                            }
                        }
                    }
                }

                // 9. Allergens
                ControlSection(title = "9. Allergenlarni cheklash") {
                    Column {
                        allergens.forEach { (key, value) ->
                            val isChecked = selectedAllergens.contains(key)
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        if (isChecked) selectedAllergens.remove(key) else selectedAllergens.add(key)
                                    }
                                    .padding(vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Checkbox(
                                    checked = isChecked,
                                    onCheckedChange = {
                                        if (isChecked) selectedAllergens.remove(key) else selectedAllergens.add(key)
                                    }
                                )
                                Text(value, style = MaterialTheme.typography.bodyMedium)
                            }
                        }
                        if (selectedAllergens.isNotEmpty()) {
                            Card(
                                colors = CardDefaults.cardColors(containerColor = Color(0xFFFFEBEE)),
                                modifier = Modifier.padding(top = 8.dp),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Row(
                                    modifier = Modifier.padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Info,
                                        contentDescription = "Warning",
                                        tint = Color(0xFFE53935)
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        "Oshpaz ushbu masalliqlarni tort tarkibidan chiqarib tashlaydi.",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = Color(0xFFE53935)
                                    )
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))
            }

            // Bottom purchase bar
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
                            val detailsStr = "Shakl: ${selectedShape.label} | Qavatlar: ${selectedLayers.count} | Ta'm: ${selectedFlavor.label} | Krem: ${selectedCream.label} | Bezak: ${selectedDecor.label}${if (customText.isNotEmpty()) " | Yozuv: \"$customText\"" else ""}"
                            val cartItem = CartItem(
                                id = "custom_cake_" + System.currentTimeMillis(),
                                name = "Maxsus 3D Tort (${selectedLayers.count} qavatli)",
                                details = detailsStr,
                                price = finalPrice,
                                quantity = 1,
                                imageEmoji = "🎂",
                                allergens = selectedAllergens.toList().map { k -> allergens.find { it.first == k }?.second ?: k }
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

@Composable
fun ControlSection(title: String, content: @Composable () -> Unit) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(bottom = 8.dp)
        )
        content()
    }
}

@Composable
fun OptionSelectButton(
    text: String,
    isSelected: Boolean,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    OutlinedButton(
        onClick = onClick,
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = ButtonDefaults.outlinedButtonColors(
            containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else Color.Transparent
        ),
        border = BorderStroke(
            width = 1.5.dp,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
        )
    ) {
        Text(
            text = text,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onBackground,
            fontWeight = FontWeight.SemiBold,
            fontSize = 13.sp
        )
    }
}

@Composable
fun ChipSelectButton(
    text: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .background(
                color = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface,
                shape = RoundedCornerShape(50)
            )
            .border(
                width = 1.dp,
                color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant,
                shape = RoundedCornerShape(50)
            )
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Text(
            text = text,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = FontWeight.SemiBold
        )
    }
}

@Composable
fun ListOptionCard(
    title: String,
    subtitle: String,
    price: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
        ),
        border = BorderStroke(
            width = if (isSelected) 1.5.dp else 1.dp,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
        )
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
            }
            if (price.isNotEmpty()) {
                Text(price, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
            } else if (isSelected) {
                Box(
                    modifier = Modifier
                        .size(20.dp)
                        .clip(CircleShape)
                        .background(MaterialTheme.colorScheme.primary),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(imageVector = Icons.Default.Check, contentDescription = "Checked", tint = Color.White, modifier = Modifier.size(12.dp))
                }
            }
        }
    }
}

@Composable
fun ColorOptionCard(
    label: String,
    hexColor: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val color = remember(hexColor) { Color(android.graphics.Color.parseColor(hexColor)) }
    Card(
        modifier = Modifier
            .width(100.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(
            width = if (isSelected) 2.dp else 1.dp,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
        )
    ) {
        Column(
            modifier = Modifier.padding(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(50.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(color)
                    .border(1.dp, Color.LightGray, RoundedCornerShape(8.dp))
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(label, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, maxLines = 1)
        }
    }
}

@Composable
fun CakeVisualizerCanvas(
    shape: String,
    layers: Int,
    flavorColorHex: String,
    creamColorHex: String,
    decorType: String,
    text: String,
    textColor: Color
) {
    val flavorColor = remember(flavorColorHex) { Color(android.graphics.Color.parseColor(flavorColorHex)) }
    val creamColor = remember(creamColorHex) { Color(android.graphics.Color.parseColor(creamColorHex)) }

    Canvas(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
    ) {
        val centerX = size.width / 2
        val startY = size.height - 30f

        // 1. Draw ceramic Stand
        drawRoundRect(
            color = Color(0xFFE5ECEF),
            topLeft = Offset(centerX - 100f, startY),
            size = Size(200f, 15f),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(6f, 6f)
        )
        val stemPath = Path().apply {
            moveTo(centerX - 25f, startY)
            lineTo(centerX + 25f, startY)
            lineTo(centerX + 15f, startY - 30f)
            lineTo(centerX - 15f, startY - 30f)
            close()
        }
        drawPath(stemPath, color = Color(0xFFD3DFE2))
        drawRoundRect(
            color = Color(0xFFF1F5F7),
            topLeft = Offset(centerX - 140f, startY - 35f),
            size = Size(280f, 12f),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(6f, 6f)
        )

        // 2. Draw Cake Tiers
        val baseWidth = 220f
        val layerHeight = 45f
        val topOffset = startY - 35f

        for (i in 0 until layers) {
            val scale = 1f - i * 0.15f
            val width = baseWidth * scale
            val left = centerX - width / 2
            val top = topOffset - (i + 1) * layerHeight

            // Draw Sponge
            if (shape == "heart") {
                // Approximate heart looking curved tier
                drawHeartTier(left, top, width, layerHeight, flavorColor)
            } else if (shape == "square") {
                // Square/rect block
                drawRect(
                    color = flavorColor,
                    topLeft = Offset(left, top),
                    size = Size(width, layerHeight)
                )
            } else {
                // Default Round (slight oval shape for depth)
                drawRoundRect(
                    color = flavorColor,
                    topLeft = Offset(left, top),
                    size = Size(width, layerHeight),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(10f, 10f)
                )
            }

            // Draw Icing line
            drawRoundRect(
                color = creamColor,
                topLeft = Offset(left - 2f, top - 3f),
                size = Size(width + 4f, 8f),
                cornerRadius = androidx.compose.ui.geometry.CornerRadius(3f, 3f)
            )

            // Drips on the top layer
            if (i == layers - 1) {
                if (decorType == "chocolate-drips" || creamColorHex == "#3D2314") {
                    val dripColor = if (creamColorHex == "#3D2314") creamColor else Color(0xFF3D2314)
                    val dripCount = 10
                    val step = width / dripCount
                    for (d in 0..dripCount) {
                        val dripX = left + d * step
                        val dripLen = 12f + (d % 3) * 6f + (if (d % 2 == 0) 4f else 0f)
                        drawRoundRect(
                            color = dripColor,
                            topLeft = Offset(dripX - 2f, top + 3f),
                            size = Size(5f, dripLen),
                            cornerRadius = androidx.compose.ui.geometry.CornerRadius(3f, 3f)
                        )
                    }
                }
                
                // Draw berries on top
                if (decorType == "berries") {
                    val berryCount = 6
                    val step = (width - 20f) / berryCount
                    for (b in 0 until berryCount) {
                        val bx = left + 10f + b * step
                        drawCircle(
                            color = if (b % 2 == 0) Color(0xFFC62828) else Color(0xFF1565C0),
                            radius = 6f,
                            center = Offset(bx, top - 8f)
                        )
                    }
                }
                
                // Draw flowers on top
                if (decorType == "flowers") {
                    val flowerColors = listOf(Color(0xFFE91E63), Color(0xFF9C27B0), Color(0xFFFFEB3B))
                    val flowerCount = 5
                    val step = (width - 20f) / flowerCount
                    for (f in 0 until flowerCount) {
                        val fx = left + 10f + f * step
                        val fColor = flowerColors[f % flowerColors.size]
                        drawCircle(color = fColor, radius = 5f, center = Offset(fx, top - 8f))
                        drawCircle(color = Color.White, radius = 2f, center = Offset(fx, top - 8f))
                    }
                }

                // Draw gold leaf spots
                if (decorType == "gold-leaf") {
                    for (g in 0..8) {
                        drawRect(
                            color = Color(0xFFFFD700),
                            topLeft = Offset(left + width * (0.1f + g * 0.1f), top + 8f + (g % 2) * 8f),
                            size = Size(6f, 6f)
                        )
                    }
                }

                // Draw Custom text on the topmost tier
                if (text.isNotEmpty() || decorType == "minimalist") {
                    val labelText = text.ifEmpty { "Tabrik!" }
                    drawContext.canvas.nativeCanvas.apply {
                        val paint = android.graphics.Paint().apply {
                            color = textColor.toArgb()
                            textSize = 30f
                            isFakeBoldText = true
                            textAlign = android.graphics.Paint.Align.CENTER
                        }
                        drawText(
                            labelText,
                            centerX,
                            top + layerHeight / 2f + 10f,
                            paint
                        )
                    }
                }
            }
        }
    }
}

fun DrawScope.drawHeartTier(left: Float, top: Float, width: Float, height: Float, color: Color) {
    val heartPath = Path().apply {
        // Draw a generic tier shape but with heart curves on the bottom and top boundaries
        moveTo(left, top + height * 0.3f)
        quadraticBezierTo(left + width * 0.25f, top, left + width * 0.5f, top + height * 0.2f)
        quadraticBezierTo(left + width * 0.75f, top, left + width, top + height * 0.3f)
        lineTo(left + width, top + height * 0.8f)
        lineTo(left + width * 0.5f, top + height)
        lineTo(left, top + height * 0.8f)
        close()
    }
    drawPath(path = heartPath, color = color)
}
