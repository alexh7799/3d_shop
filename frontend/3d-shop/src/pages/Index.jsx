import { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Header } from '../components/Header/Header';
import { Button } from '../components/button/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card/Card';
import { Badge } from '../components/badge/Badge';
import { Cart } from '../components/cart/Cart';
import { WelcomeDialog } from '../components/welcomeDialog/WelcomeDialog';

const products = [
    {
        id: 1,
        name: "Moderne Stehlampe",
        description: "Elegante LED-Stehlampe mit dimmbarem Licht",
        price: 189.99,
        image: "/placeholder.svg",
        rating: 4.5,
        reviews: 124,
        category: "Beleuchtung",
        colors: ["Schwarz", "Weiß", "Grau"],
        inStock: true
    },
    {
        id: 2,
        name: "Gemütlicher Sessel",
        description: "Bequemer Polstersessel im skandinavischen Stil",
        price: 299.99,
        image: "/placeholder.svg",
        rating: 4.8,
        reviews: 89,
        category: "Sitzmöbel",
        colors: ["Beige", "Grau", "Blau"],
        inStock: true
    },
    {
        id: 3,
        name: "Holz Couchtisch",
        description: "Massiver Eichentisch mit modernem Design",
        price: 249.99,
        image: "/placeholder.svg",
        rating: 4.3,
        reviews: 67,
        category: "Tische",
        colors: ["Eiche", "Nussbaum", "Weiß"],
        inStock: false
    },
    {
        id: 4,
        name: "Bücherregal",
        description: "Modulares Regalsystem aus nachhaltiger Buche",
        price: 159.99,
        image: "/placeholder.svg",
        rating: 4.6,
        reviews: 156,
        category: "Aufbewahrung",
        colors: ["Buche", "Weiß", "Schwarz"],
        inStock: true
    },
    {
        id: 5,
        name: "Designer Spiegel",
        description: "Runder Wandspiegel mit LED-Beleuchtung",
        price: 129.99,
        image: "/placeholder.svg",
        rating: 4.4,
        reviews: 93,
        category: "Dekoration",
        colors: ["Gold", "Silber", "Bronze"],
        inStock: true
    },
    {
        id: 6,
        name: "Esstisch Set",
        description: "Tisch mit 4 Stühlen im modernen Design",
        price: 599.99,
        image: "/placeholder.svg",
        rating: 4.7,
        reviews: 78,
        category: "Tische",
        colors: ["Eiche", "Schwarz", "Weiß"],
        inStock: true
    }
];

const Index = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Alle');

    const categories = ['Alle', ...Array.from(new Set(products.map(p => p.category)))];
    const filteredProducts = selectedCategory === 'Alle'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        const cartItem = {
            id: product.id,
            name: product.name,
            color: product.colors[0],
            texture: 'Standard',
            price: product.price,
            quantity: 1
        };

        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === cartItem.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === cartItem.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, cartItem];
        });
    };

    const handleUpdateQuantity = (id, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return (
        <div className="min-h-screen bg-gray-900">
            <WelcomeDialog />
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />

            <main className="container mx-auto py-8 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Unsere Produkte
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Entdecken Sie unsere Kollektion hochwertiger Möbel und Einrichtungsgegenstände
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className="mb-2"
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 glass border-border/50" onClick={() => console.log(`Produkt ${product.name} ausgewählt`)}>
                            <CardHeader className="p-0">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background">
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    {!product.inStock && (
                                        <Badge variant="secondary" className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                                            Ausverkauft
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                    <Badge variant="outline">{product.category}</Badge>
                                </div>

                                <CardDescription className="mb-3">
                                    {product.description}
                                </CardDescription>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {product.rating} ({product.reviews} Bewertungen)
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {product.colors.map((color) => (
                                        <Badge key={color} variant="secondary" className="text-xs">
                                            {color}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                <div className="text-2xl font-bold text-primary">
                                    €{product.price}
                                </div>
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!product.inStock}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    {product.inStock ? 'In den Warenkorb' : 'Ausverkauft'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

export default Index;