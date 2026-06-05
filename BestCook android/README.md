# Best Cook Android Application (analogue in Kotlin)

Ushbu loyiha **Best Cook** veb-ilovasining Android platformasi uchun Kotlin tilida yozilgan mobil analogidir. Ilova zamonaviy **Jetpack Compose** deklarativ UI freymvorkidan foydalangan holda qurilgan.

## Texnologik Stack
* **Til:** Kotlin (1.9.22)
* **SDK darajasi:** targetSdk 34, minSdk 26 (Android 8.0+)
* **UI:** Jetpack Compose (BOM 2024.02.00) & Material Design 3
* **Arxitektura:** MVVM (Model-View-ViewModel) state-flow orqali
* **Navigatsiya:** Jetpack Compose Navigation
* **Rasm yuklash:** Coil-compose (2.5.0) asinxron tarmoq rasmlari uchun

## Ilova Tuzilishi (Modullar)
Ilovaning asosiy qismlari `app/src/main/java/com/bestcook/app/` papkasida joylashgan:
1. **`model/Models.kt`:** Ilovaning ma'lumotlar modeli (Kategoriyalar, Mahsulotlar, Oshpazlar, Savat elementlari, Buyurtmalar) va ko'rgazmali test ma'lumotlari.
2. **`viewmodel/CartViewModel.kt`:** Savat holati va buyurtmalar tarixini boshqaruvchi shared ViewModel.
3. **`ui/theme/`:** Material 3 asosidagi ranglar sxemasi (brend to'q sariq va kremli ranglar palitrasi), tipografiya va dastur mavzusi.
4. **`ui/navigation/`:** Bottom navigation barchasi bilan NavHost navigatsiya grafigi.
5. **`ui/screens/`:** Asosiy ekranlar:
   * **`HomeScreen`:** Oshpazlar ro'yxati, kategoriyalar, mashhur taomlar va konstruktorni ishga tushirish banneri.
   * **`CakeConstructorScreen`:** Tort shakli, qavati, ta'mi va bezagini tanlab, narxni real-vaqtda hisoblovchi **Jetpack Compose Canvas** asosidagi interaktiv 2D/3D vizualizator.
   * **`FastFoodConstructorScreen` Burger/Pizza sozlagichi:** Kaloriya hisoblagichi, vazn hisobi va allergen ogohlantirishlari.
   * **`SellersScreen`:** Mahalla oshpazlarining batafsil ro'yxati, reytinglar va yulduzchalari.
   * **`CartScreen`:** Tanlangan taomlar ro'yxati, miqdorini oshirish/kamaytirish va allergen ogohlantirish belgilari.
   * **`CheckoutScreen`:** Buyurtma beruvchining manzili va telefon raqami shakli.
   * **`ProfileScreen`:** Xaridor haqida ma'lumot va yuborilgan buyurtmalarning tayyorlanish / yetkazilish holati (Status badge).

## Android Studioda Ishga Tushirish
1. Android Studio programmasini oching.
2. **Open** tugmasini bosing va loyiha joylashgan papkani tanlang: `d:\Best Cake\Best cook`
3. Gradle sinkronizatsiyasi tugashini kuting.
4. Emulator yoki shaxsiy smartfoningizni kompyuterga ulang va **Run** (yashil uchburchak) tugmasini bosing.

Loyiha to'liq va avtomatik ravishda kompilyatsiya bo'lishi uchun barcha `build.gradle.kts`, `settings.gradle.kts` va Android manifest fayllari tayyor holga keltirilgan.
