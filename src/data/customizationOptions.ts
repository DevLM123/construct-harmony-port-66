
import { CustomizationOption } from '@/components/customization/CustomizationOptionCard';

export interface CustomizationData {
  fixtures: CustomizationOption[];
  cabinets: CustomizationOption[];
  flooring: CustomizationOption[];
  paint: CustomizationOption[];
  [key: string]: CustomizationOption[];
}

export const customizationOptions: CustomizationData = {
  fixtures: [
    { id: 1, name: 'Modern Matte Black', description: 'Sleek matte black bathroom and kitchen fixtures', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Classic Chrome', description: 'Timeless chrome fixtures for a traditional look', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Brushed Nickel', description: 'Elegant brushed nickel fixtures with a warm tone', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Brass Accent', description: 'Luxurious brass fixtures for a premium look', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  cabinets: [
    { id: 1, name: 'Shaker Style', description: 'Clean lines with recessed panel doors', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Flat Panel', description: 'Minimalist design with smooth doors', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Glass Front', description: 'Elegant cabinets with glass panel inserts', image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Wood Grain', description: 'Natural wood grain finish with rich texture', image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  flooring: [
    { id: 1, name: 'Hardwood', description: 'Classic oak, maple, or walnut hardwood flooring', image: 'https://images.unsplash.com/photo-1577724562772-f0b50a0a0802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Luxury Vinyl', description: 'Durable water-resistant vinyl with wood or stone look', image: 'https://images.unsplash.com/photo-1589407625241-d172a0ac3349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Tile', description: 'Ceramic or porcelain tile in various patterns', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Engineered Wood', description: 'Stable engineered wood with premium top layer', image: 'https://images.unsplash.com/photo-1609587292244-217150db8d22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  paint: [
    { id: 1, name: 'Neutral Palette', description: 'Warm beiges, soft grays, and gentle whites', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Bold Accents', description: 'Statement walls with rich, vibrant colors', image: 'https://images.unsplash.com/photo-1589407625241-d172a0ac3349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Earth Tones', description: 'Natural earth-inspired colors for a calming atmosphere', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Coastal Blues', description: 'Ocean-inspired blues and soft aquas', image: 'https://images.unsplash.com/photo-1557592122-b9c7c0af3824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ]
};
