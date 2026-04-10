'use client';

import {
  ShoppingCart,
  ShoppingBag,
  Bell,
  Search,
  Home,
  Heart,
  User,
  Star,
  Minus,
  Plus,
  Share2,
  ArrowLeft,
  Trash2,
  Wifi,
  Battery,
} from 'lucide-react';

export interface AppScreen {
  id: string;
  component: React.FC<{ onNavigate: (screenIndex: number) => void }>;
}

/* ── Screen 1: Home / Catalog ── */
const HomeScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const products = [
    { name: 'Tricou Sport', price: '89 Lei', rating: 4.5, bg: '#F0FDF4', iconColor: '#10B981' },
    { name: 'Pantofi Running', price: '249 Lei', rating: 4.7, bg: '#FFFBEB', iconColor: '#F59E0B' },
    { name: 'Geaca Wind', price: '349 Lei', rating: 4.8, bg: '#EAF5FF', iconColor: '#2B8FCC', sale: true },
    { name: 'Sort Plaja', price: '69 Lei', rating: 4.3, bg: '#FEF2F2', iconColor: '#EF4444' },
  ];
  const cats = ['Toate', 'Barbati', 'Femei', 'Copii'];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px 4px', background: '#fff' }}>
        <span style={{ fontSize: 11, fontWeight: 700 }}>10:24</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Wifi size={11} />
          <Battery size={11} />
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 12px 8px', background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: '#0D1117' }}>ShopNow</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={18} />
            <span style={{ position: 'absolute', top: -5, right: -5, background: '#EF4444', color: '#fff', borderRadius: 99, fontSize: 8, fontWeight: 700, padding: '1px 3px' }}>2</span>
          </div>
          <Bell size={18} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F3F4F6', borderRadius: 8, padding: '6px 10px', marginBottom: 8 }}>
          <Search size={13} color="#8A94A6" />
          <span style={{ fontSize: 11, color: '#8A94A6' }}>Cauta produse...</span>
        </div>

        {/* Banner */}
        <div style={{ background: '#2B8FCC', borderRadius: 10, padding: '10px 14px', marginBottom: 10, color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Summer Sale -40%</div>
          <div style={{ fontSize: 10, opacity: 0.85, marginBottom: 6 }}>Oferta limitata</div>
          <button style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', border: 'none', borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>Shop Now</button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto' }}>
          {cats.map((c, i) => (
            <span key={c} style={{ flexShrink: 0, padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600, background: i === 0 ? '#2B8FCC' : '#F3F4F6', color: i === 0 ? '#fff' : '#4A5568', cursor: 'pointer' }}>{c}</span>
          ))}
        </div>

        {/* Products */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Populare</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {products.map((p) => (
            <div key={p.name} onClick={() => onNavigate(1)} style={{ background: '#fff', borderRadius: 10, border: '1px solid #F3F4F6', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 60, background: p.bg, position: 'relative' }}>
                {p.sale && <span style={{ position: 'absolute', top: 4, left: 4, background: '#EF4444', color: '#fff', fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 4 }}>SALE</span>}
              </div>
              <div style={{ padding: '6px 7px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0D1117' }}>{p.price}</span>
                  <span style={{ fontSize: 10, color: '#F59E0B', fontWeight: 600 }}>★ {p.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Home', active: true }, { Icon: Search, label: 'Cauta' }, { Icon: ShoppingCart, label: 'Cos', badge: true }, { Icon: Heart, label: 'Salvate' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active, badge }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
              {badge && <span style={{ position: 'absolute', top: -4, right: -4, background: '#EF4444', color: '#fff', borderRadius: 99, fontSize: 7, fontWeight: 700, padding: '0 2px' }}>2</span>}
            </div>
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 2: Product Details ── */
const ProductScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => (
  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
      <button onClick={() => onNavigate(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={18} /></button>
      <span style={{ fontWeight: 700, fontSize: 13 }}>Detalii produs</span>
      <Share2 size={16} color="#8A94A6" />
    </div>

    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 8px' }}>
      {/* Product image */}
      <div style={{ height: 160, background: '#EAF5FF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ShoppingBag size={36} color="#2B8FCC" />
        <span style={{ position: 'absolute', top: 10, left: 10, background: '#EF4444', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>SALE -30%</span>
      </div>

      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Geaca Wind Pro Series</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B' }}>4.8</span>
          {[0,1,2,3,4].map(i => <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />)}
          <span style={{ fontSize: 10, color: '#8A94A6' }}>(127 recenzii)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#2B8FCC' }}>349 Lei</span>
          <span style={{ fontSize: 13, color: '#8A94A6', textDecoration: 'line-through' }}>499 Lei</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', marginBottom: 8 }}>
          {['Descriere', 'Specificatii', 'Recenzii'].map((t, i) => (
            <span key={t} style={{ padding: '4px 10px', fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#2B8FCC' : '#8A94A6', borderBottom: i === 0 ? '2px solid #2B8FCC' : '2px solid transparent', marginBottom: -1, cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.5, marginBottom: 10 }}>Geaca windbreaker usoara, impermeabila, cu fermoar YKK si buzunare cu fermoar. Perfecta pentru activitati outdoor si running.</p>

        {/* Size */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Marime</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['S', 'M', 'L', 'XL'].map(s => (
              <span key={s} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: s === 'M' ? '2px solid #2B8FCC' : '1.5px solid #E5E7EB', fontSize: 11, fontWeight: s === 'M' ? 700 : 500, background: s === 'M' ? '#EAF5FF' : '#fff', color: s === 'M' ? '#2B8FCC' : '#4A5568', cursor: 'pointer' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Color */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Culoare</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{c:'#0D1117',sel:true},{c:'#2B8FCC',sel:false},{c:'#9CA3AF',sel:false}].map(({c, sel}, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: sel ? '2px solid #2B8FCC' : '2px solid #E5E7EB', outline: sel ? '2px solid #2B8FCC' : 'none', outlineOffset: 2, cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        {/* Qty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600 }}>Cantitate</span>
          <button style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Minus size={11} /></button>
          <span style={{ fontSize: 13, fontWeight: 700 }}>1</span>
          <button style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Plus size={11} /></button>
        </div>

        {/* Add to cart */}
        <button style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
          <ShoppingCart size={14} /> Adauga in cos
        </button>
      </div>
    </div>

    {/* Bottom Nav */}
    <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
      {[{ Icon: Home, label: 'Home' }, { Icon: Search, label: 'Cauta' }, { Icon: ShoppingCart, label: 'Cos', active: true }, { Icon: Heart, label: 'Salvate' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
        <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
          <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Screen 3: Cart ── */
const CartScreen: React.FC<{ onNavigate: (i: number) => void }> = () => {
  const items = [
    { name: 'Geaca Wind Pro', variant: 'M / Negru', price: '349 Lei', qty: 1, bg: '#EAF5FF' },
    { name: 'Tricou Sport', variant: 'L / Alb', price: '89 Lei', qty: 2, bg: '#F0FDF4' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Cosul meu</span>
        <Trash2 size={16} color="#8A94A6" />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        {/* Cart items */}
        {items.map((item) => (
          <div key={item.name} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: item.bg, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 10, color: '#8A94A6' }}>{item.variant}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <button style={{ width: 20, height: 20, borderRadius: 5, border: '1px solid #E5E7EB', background: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={9} /></button>
                <span style={{ fontSize: 11 }}>{item.qty}</span>
                <button style={{ width: 20, height: 20, borderRadius: 5, border: '1px solid #E5E7EB', background: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={9} /></button>
              </div>
            </div>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10, marginBottom: 10 }}>
          {/* Promo code */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <input style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 11, outline: 'none' }} placeholder="Cod promotional..." />
            <button style={{ background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Aplica</button>
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: '#4A5568' }}>Subtotal</span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>289 Lei</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#4A5568' }}>Livrare</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10B981' }}>Gratuit</span>
          </div>
          <div style={{ borderTop: '2px solid #F3F4F6', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0D1117' }}>289 Lei</span>
          </div>
        </div>

        <button style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          Finalizeaza comanda
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Home' }, { Icon: Search, label: 'Cauta' }, { Icon: ShoppingCart, label: 'Cos', active: true }, { Icon: Heart, label: 'Salvate' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ecommerceScreens: AppScreen[] = [
  { id: 'home', component: HomeScreen },
  { id: 'product', component: ProductScreen },
  { id: 'cart', component: CartScreen },
];
