data class Product(
    val title: String,
    val description: String,
    val thumbnail: String
)

interface ProductService {
    @GET("products")
    suspend fun getProducts(@Query("skip") skip: Int, @Query("limit") limit: Int): List<Product>
}

val retrofit = Retrofit.Builder()
    .baseUrl("https://dummyjson.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val productService = retrofit.create(ProductService::class.java)

val products = productService.getProducts(0, 20)

val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)
recyclerView.layoutManager = LinearLayoutManager(this)
recyclerView.adapter = ProductAdapter(products)

class ProductAdapter(private val products: List<Product>) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_product, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = products[position]
        holder.bind(product)
    }

    override fun getItemCount(): Int {
        return products.size
    }

    inner class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(product: Product) {
            itemView.findViewById<TextView>(R.id.titleTextView).text = product.title
            itemView.findViewById<TextView>(R.id.descriptionTextView).text = product.description
            
        }
    }
}

Glide.with(itemView)
    .load(product.thumbnail)
    .into(itemView.findViewById(R.id.thumbnailImageView))

class ProductDetailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_detail)
        
        val product = intent.getParcelableExtra<Product>("product")
        
    }
}
searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener) {
    override fun onQueryTextSubmit(query: String?): Boolean {
        return true
    }

    override fun onQueryTextChange(newText: String?): Boolean {
        return true
    }
}

val categories = listOf("Category 1", "Category 2", "Category 3")
val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, categories)
categorySpinner.adapter = adapter