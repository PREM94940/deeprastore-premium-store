import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../data/mockData';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  UploadCloud, 
  Calendar, 
  Search, 
  X
} from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, bulkUploadProducts } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State for create/edit
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameTe: '',
    price: 15000,
    originalPrice: 18000,
    category: 'sarees',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
    description: '',
    descriptionTe: '',
    rating: 4.8,
    reviewsCount: 12,
    tags: ['Luxury', 'Handloom'],
    variants: { sizes: ['S', 'M', 'L'], colors: [{ name: 'Gold', hex: '#b8860b' }] },
    stockStatus: 'ready_stock',
    inventory: 20,
    codAvailable: true,
    seoTitle: '',
    seoMeta: '',
    published: true,
    scheduledDate: ''
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData(prod);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingProduct(null);
    setFormData({
      id: `prod-${Date.now()}`,
      name: '',
      nameTe: '',
      price: 15000,
      originalPrice: 18000,
      category: 'sarees',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
      description: '',
      descriptionTe: '',
      rating: 4.8,
      reviewsCount: 12,
      tags: ['Luxury', 'Handloom'],
      variants: { sizes: ['S', 'M', 'L'], colors: [{ name: 'Gold', hex: '#b8860b' }] },
      stockStatus: 'ready_stock',
      inventory: 20,
      codAvailable: true,
      seoTitle: '',
      seoMeta: '',
      published: true,
      scheduledDate: ''
    });
    setIsCreating(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (isCreating) {
      addProduct(formData as Product);
      setIsCreating(false);
    } else if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData } as Product);
      setEditingProduct(null);
    }
  };

  const handleSimulateBulkUpload = () => {
    const bulkProducts: Product[] = [
      {
        id: `prod-bulk-1`,
        name: 'Royal Sapphire Kanjivaram Brocade Saree',
        nameTe: 'రాయల్ సఫైర్ కంచిపట్టు బ్రోకేడ్ చీర',
        price: 26500,
        originalPrice: 31000,
        category: 'sarees',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
        description: 'Exquisite royal sapphire blue Kanjivaram pure silk saree featuring pure gold zari peacock motifs.',
        descriptionTe: 'అద్భుతమైన రాయల్ సఫైర్ బ్లూ కంచిపట్టు పట్టు చీర.',
        rating: 4.9,
        reviewsCount: 15,
        tags: ['Sapphire', 'Silk', 'Bridal', 'Kanjivaram'],
        variants: { colors: [{ name: 'Sapphire Blue', hex: '#0f52ba' }] },
        stockStatus: 'ready_stock',
        inventory: 10,
        codAvailable: true,
        seoTitle: 'Royal Sapphire Kanjivaram Pure Silk Saree | Deeprastore',
        seoMeta: 'Buy authentic Handloom Kanjivaram Pure Silk Saree online at Deeprastore.',
        published: true
      },
      {
        id: `prod-bulk-2`,
        name: 'Magenta Velvet Bridal Heavy Lehenga',
        nameTe: 'మజెంటా వెల్వెట్ బ్రైడల్ హెవీ లెహెంగా',
        price: 45000,
        originalPrice: 52000,
        category: 'lehengas',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80'],
        description: 'Heavy micro velvet lehenga with dense zardozi hand embroidery.',
        descriptionTe: 'జర్‌దోసి హ్యాండ్ ఎంబ్రాయిడరీతో కూడిన హెవీ వెల్వెట్ లెహెంగా.',
        rating: 5.0,
        reviewsCount: 8,
        tags: ['Lehenga', 'Bridal', 'Velvet', 'Magenta'],
        variants: { sizes: ['S', 'M', 'L', 'XL'] },
        stockStatus: 'ready_stock',
        inventory: 4,
        codAvailable: false,
        seoTitle: 'Magenta Velvet Bridal Heavy Lehenga | Deeprastore',
        seoMeta: 'Shop the stunning Magenta Velvet Bridal Lehenga with heavy zardozi hand embroidery.',
        published: true
      }
    ];

    bulkUploadProducts(bulkProducts);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Management Toolbar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search products, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            <option value="all">All Categories</option>
            <option value="sarees">Sarees</option>
            <option value="lehengas">Lehengas</option>
            <option value="fabrics">Fabrics</option>
            <option value="custom-blouses">Custom Blouses</option>
            <option value="menswear">Menswear</option>
            <option value="kurta-sets">Kurta Sets</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleSimulateBulkUpload}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <UploadCloud className="w-4 h-4 text-amber-700" />
            <span>Bulk Upload CSV</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="bg-stone-900 hover:bg-stone-950 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-900 text-white uppercase tracking-wider font-semibold border-b border-stone-800">
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Inventory</th>
                <th className="p-4">Status</th>
                <th className="p-4">SEO / Tags</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 pl-6 flex items-center gap-3">
                    <img src={prod.images[0]} alt="" className="w-12 h-14 object-cover rounded-xl border border-stone-200 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900 line-clamp-1">{prod.name}</p>
                      <p className="text-[11px] text-stone-500 line-clamp-1">{prod.nameTe}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-stone-700 capitalize">{prod.category.replace('-', ' ')}</td>
                  <td className="p-4 font-serif font-bold text-stone-950 text-sm">₹{prod.price.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`font-bold px-2.5 py-1 rounded-lg ${prod.inventory > 10 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>
                      {prod.inventory} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest ${prod.published ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}>
                      {prod.published ? 'Published' : 'Draft'}
                    </span>
                    {prod.scheduledDate && (
                      <p className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-700" /> {prod.scheduledDate}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {prod.tags.map(t => (
                        <span key={t} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[10px] font-medium border border-stone-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button
                      onClick={() => handleStartEdit(prod)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Product Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative border border-stone-200 my-8">
            <button 
              onClick={() => { setIsCreating(false); setEditingProduct(null); }}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-stone-950">
                {isCreating ? 'Add New Masterpiece' : 'Edit Product Specification'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">Shopify Admin Catalog Configuration</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Product Title (English)</label>
                  <input 
                    type="text" 
                    value={formData.name || ''} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Product Title (Telugu)</label>
                  <input 
                    type="text" 
                    value={formData.nameTe || ''} 
                    onChange={(e) => setFormData({ ...formData, nameTe: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Selling Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price || 0} 
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Original Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.originalPrice || 0} 
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Category</label>
                  <select 
                    value={formData.category || 'sarees'} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
                  >
                    <option value="sarees">Sarees</option>
                    <option value="lehengas">Lehengas</option>
                    <option value="fabrics">Fabrics</option>
                    <option value="custom-blouses">Custom Blouses</option>
                    <option value="menswear">Menswear</option>
                    <option value="kurta-sets">Kurta Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Inventory Count</label>
                  <input 
                    type="number" 
                    value={formData.inventory || 0} 
                    onChange={(e) => setFormData({ ...formData, inventory: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">SEO Title</label>
                  <input 
                    type="text" 
                    value={formData.seoTitle || ''} 
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                    placeholder="E.g. Royal Kanjivaram Pure Silk Saree | Deeprastore"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Schedule Publishing Date</label>
                  <input 
                    type="date" 
                    value={formData.scheduledDate || ''} 
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Product Description (English)</label>
                <textarea 
                  rows={3}
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Product Description (Telugu)</label>
                <textarea 
                  rows={2}
                  value={formData.descriptionTe || ''} 
                  onChange={(e) => setFormData({ ...formData, descriptionTe: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Product Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  value={formData.tags?.join(', ') || ''} 
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  placeholder="E.g. Silk, Bridal, Handloom, Luxury"
                />
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-950 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  {isCreating ? 'Save New Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
