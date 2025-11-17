import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const computers = [
  {
    id: 1,
    name: 'Office Pro',
    price: '45 990 ₽',
    image: '💼',
    tagline: 'Для работы и учёбы',
    specs: {
      cpu: 'Intel Core i5-12400F',
      gpu: 'Intel UHD Graphics 730',
      ram: '16 ГБ DDR4',
      storage: '512 ГБ NVMe SSD',
      power: '450W',
    },
  },
  {
    id: 2,
    name: 'Gaming Start',
    price: '79 990 ₽',
    image: '🎮',
    tagline: 'Игры в Full HD',
    specs: {
      cpu: 'AMD Ryzen 5 5600',
      gpu: 'NVIDIA RTX 3060 12GB',
      ram: '16 ГБ DDR4',
      storage: '1 ТБ NVMe SSD',
      power: '650W',
    },
  },
  {
    id: 3,
    name: 'Gaming Pro',
    price: '129 990 ₽',
    image: '⚡',
    tagline: 'Максимум FPS в 2K',
    specs: {
      cpu: 'Intel Core i7-13700KF',
      gpu: 'NVIDIA RTX 4070 12GB',
      ram: '32 ГБ DDR5',
      storage: '2 ТБ NVMe SSD',
      power: '850W',
    },
  },
  {
    id: 4,
    name: 'Creator Ultra',
    price: '189 990 ₽',
    image: '🚀',
    tagline: 'Для создателей контента',
    specs: {
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4080 16GB',
      ram: '64 ГБ DDR5',
      storage: '4 ТБ NVMe SSD',
      power: '1000W',
    },
  },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const heroScale = Math.max(0.9, 1 - scrollY / 2000);
  const catalogOpacity = Math.min(1, Math.max(0, (scrollY - 200) / 300));
  const catalogBlur = Math.max(0, 20 - (scrollY - 200) / 10);

  return (
    <div className="min-h-screen bg-white">
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% ${Math.min(100, scrollY / 5)}%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)`,
        }}
      />

      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="text-7xl animate-fade-in">🖥️</div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-[#1A1F2C] animate-fade-in">
            Лучшие ПК за самую
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              доступную цену
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-in font-light">
            Только у нас! Собираем компьютеры с умом и любовью
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Выбрать ПК
              <Icon name="ArrowDown" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Узнать больше
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-gray-400" />
        </div>
      </section>

      <section
        className="relative min-h-screen py-24 px-4"
        style={{
          opacity: catalogOpacity,
          filter: `blur(${catalogBlur}px)`,
          transition: 'filter 0.3s ease-out',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-[#1A1F2C]">
              Выберите свой идеальный ПК
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Каждый компьютер собран с тщательным подбором комплектующих
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {computers.map((pc) => (
              <Card
                key={pc.id}
                className="relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group border-gray-200"
                onMouseEnter={() => setHoveredCard(pc.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === pc.id ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-6 relative z-10">
                  <div className="text-6xl mb-4 text-center transition-transform duration-500 group-hover:scale-110">
                    {pc.image}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-[#1A1F2C]">{pc.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{pc.tagline}</p>
                  
                  <div className="text-3xl font-bold mb-6 text-[#0EA5E9]">
                    {pc.price}
                  </div>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredCard === pc.id ? '400px' : '0',
                      opacity: hoveredCard === pc.id ? 1 : 0,
                    }}
                  >
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <Icon name="Cpu" size={18} className="text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{pc.specs.cpu}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Icon name="Layers" size={18} className="text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{pc.specs.gpu}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Icon name="MemoryStick" size={18} className="text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{pc.specs.ram}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Icon name="HardDrive" size={18} className="text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{pc.specs.storage}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Icon name="Zap" size={18} className="text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{pc.specs.power}</div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl transition-all duration-300"
                    >
                      Заказать
                      <Icon name="ShoppingCart" size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 PC Shop. Лучшие компьютеры по доступным ценам</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
