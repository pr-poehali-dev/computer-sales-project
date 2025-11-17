import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const computers = [
  {
    id: 1,
    name: 'Office Vintage',
    price: '500 000 ₽',
    imageUrl: 'https://cdn.poehali.dev/projects/0f3766fb-245b-405a-b790-19a44261c00b/files/3964b2f9-4891-4d94-b58f-cac689080bbf.jpg',
    tagline: 'Раритет для ценителей',
    specs: {
      cpu: 'Intel Pentium 4 2.8GHz',
      gpu: 'Integrated Graphics 64MB',
      ram: '512 МБ DDR',
      storage: '40 ГБ HDD',
      power: '200W',
    },
  },
  {
    id: 2,
    name: 'Gaming Classic',
    price: '750 000 ₽',
    imageUrl: 'https://cdn.poehali.dev/projects/0f3766fb-245b-405a-b790-19a44261c00b/files/b6655c14-a437-4cae-a8a8-802eb01a556c.jpg',
    tagline: 'Для игр 2005 года',
    specs: {
      cpu: 'AMD Athlon 64 X2',
      gpu: 'NVIDIA GeForce 6600 128MB',
      ram: '1 ГБ DDR2',
      storage: '80 ГБ HDD',
      power: '300W',
    },
  },
  {
    id: 3,
    name: 'Gaming Retro',
    price: '999 000 ₽',
    imageUrl: 'https://cdn.poehali.dev/projects/0f3766fb-245b-405a-b790-19a44261c00b/files/6cc04074-8e29-4c3a-9467-e337dc52aff9.jpg',
    tagline: 'Легендарная классика',
    specs: {
      cpu: 'Intel Core 2 Duo E6400',
      gpu: 'ATI Radeon X1950 Pro 256MB',
      ram: '2 ГБ DDR2',
      storage: '160 ГБ HDD',
      power: '350W',
    },
  },
  {
    id: 4,
    name: 'Creator Antique',
    price: '1 500 000 ₽',
    imageUrl: 'https://cdn.poehali.dev/projects/0f3766fb-245b-405a-b790-19a44261c00b/files/a70de961-6a5b-4cd6-83f5-221948d39d6f.jpg',
    tagline: 'Музейный экспонат',
    specs: {
      cpu: 'Intel Pentium III 1.0GHz',
      gpu: 'NVIDIA Riva TNT2 32MB',
      ram: '256 МБ SDRAM',
      storage: '20 ГБ HDD',
      power: '150W',
    },
  },
  {
    id: 5,
    name: 'Самый бюджетный ПК',
    price: '499 999 ₽',
    imageUrl: 'https://cdn.poehali.dev/projects/0f3766fb-245b-405a-b790-19a44261c00b/files/6a92c949-7dff-49f8-b1c6-21add78434df.jpg',
    tagline: 'Революционная технология',
    specs: {
      cpu: 'Органический процессор 0.0001 GHz',
      gpu: 'Встроенная графика (крахмал)',
      ram: '0 МБ (работает на энтузиазме)',
      storage: '0 ГБ (всё в облаке земли)',
      power: '5V от USB',
    },
  },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { toast } = useToast();

  const handleOrder = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentChoice = () => {
    setShowPaymentDialog(false);
    toast({
      variant: 'destructive',
      title: '❌ Вещи взятые в ипотеку не принимаем',
      description: 'Попробуйте оплатить чем-то другим',
    });
  };

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
              onClick={() => window.open('https://ru.wiktionary.org/wiki/%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B5', '_blank')}
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
                  <div className="mb-4 transition-transform duration-500 group-hover:scale-105">
                    <img 
                      src={pc.imageUrl} 
                      alt={pc.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
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
                      onClick={handleOrder}
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600">© 2024 PC Shop. Лучшие компьютеры по доступным ценам</p>
            
            <div className="flex gap-6">
              <a 
                href="https://t.me/Visha4k" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0EA5E9] transition-colors duration-300 flex items-center gap-2"
              >
                <Icon name="Send" size={20} />
                <span>Telegram</span>
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0EA5E9] transition-colors duration-300 flex items-center gap-2"
              >
                <Icon name="Youtube" size={20} />
                <span>YouTube</span>
              </a>
              
              <a 
                href="https://mail.ru/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0EA5E9] transition-colors duration-300 flex items-center gap-2"
              >
                <Icon name="Mail" size={20} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Выберите способ оплаты</AlertDialogTitle>
            <AlertDialogDescription>
              Как вы хотите оплатить этот прекрасный компьютер?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogAction
              onClick={handlePaymentChoice}
              className="bg-[#0EA5E9] hover:bg-[#0284C7]"
            >
              🚗 Оплатить машиной
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handlePaymentChoice}
              className="bg-[#0EA5E9] hover:bg-[#0284C7]"
            >
              🏠 Оплатить домом
            </AlertDialogAction>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;