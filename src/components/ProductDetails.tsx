import React from 'react';
import '../styles/ProductDetails.css';

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
  } | null;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  if (!product) return null;

  const getDetailedDescription = (category: string) => {
    const details = {
      Electronics: "Electronic devices contain numerous hazardous materials including lead, mercury, and flame retardants. Circuit boards, components, and connectors often contain valuable metals like gold, silver, and copper that can be recovered through proper recycling.",
      Audio: "Modern audio devices, especially wireless ones, contain lithium batteries, complex circuit boards, and rare earth magnets. Their small size often leads to casual disposal, but they require proper e-waste handling.",
      Wearables: "Smart watches and fitness trackers pack sophisticated electronics into tiny packages. They contain lithium batteries, display components, and sensors that require special recycling processes.",
      Batteries: "Batteries contain various toxic materials including lead, mercury, cadmium, and lithium. When improperly disposed, these chemicals can leach into soil and groundwater, causing severe environmental damage.",
      Lighting: "Fluorescent and LED lighting products contain mercury, lead, and other toxic materials. These components require specialized handling to prevent environmental contamination.",
      Appliances: "Large household electronics contain significant amounts of metals, plastics, and hazardous materials. Their size and composition make them particularly problematic when sent to landfills.",
      Industrial: "Industrial electronic equipment often contains larger quantities of hazardous materials and requires specialized disposal methods due to their complexity and size."
    };
    return details[category as keyof typeof details] || "";
  };

  const getEnvironmentalImpact = (category: string) => {
    const impacts = {
      Electronics: "When electronics end up in landfills, toxic materials can leach into soil and water systems. Proper recycling can recover valuable metals and prevent environmental contamination while conserving natural resources.",
      Audio: "Small audio devices are frequently replaced and often improperly disposed of in regular trash. Their batteries can cause fires in waste facilities, and their components contain materials that never biodegrade.",
      Wearables: "The rapid pace of wearable technology advancement leads to frequent device replacement. Their compact size and integrated batteries make recycling challenging but crucial for environmental protection.",
      Batteries: "Battery disposal is a critical environmental concern. Improper disposal can lead to soil and water contamination, while proper recycling can recover valuable metals and prevent toxic leakage.",
      Lighting: "Mercury from fluorescent bulbs can contaminate large areas if broken. Proper disposal is essential to prevent mercury vapor release and other toxic contamination.",
      Appliances: "Large appliances in landfills take up significant space and can release harmful substances. Their metals and components can be recycled to conserve resources and prevent environmental damage.",
      Industrial: "Industrial e-waste has a larger environmental footprint due to its size and quantity of hazardous materials. Proper handling is crucial to prevent large-scale environmental contamination."
    };
    return impacts[category as keyof typeof impacts] || "";
  };

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div className="product-details-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="product-details-content">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details-info">
            <h2>{product.name}</h2>
            <span className="category-tag">{product.category}</span>
            
            <h3>Environmental Hazards</h3>
            <p>{product.description}</p>
            
            <h3>Detailed Impact</h3>
            <p>{getDetailedDescription(product.category)}</p>
            
            <h3>Proper Disposal Importance</h3>
            <p>{getEnvironmentalImpact(product.category)}</p>
            
            <div className="eco-features">
              <h3>Common Harmful Components</h3>
              <ul>
                {product.category === "Batteries" && (
                  <>
                    <li>Lead and acid electrolytes</li>
                    <li>Cadmium and nickel</li>
                    <li>Lithium compounds</li>
                    <li>Corrosive materials</li>
                    <li>Heavy metals</li>
                  </>
                )}
                {product.category === "Lighting" && (
                  <>
                    <li>Mercury vapor</li>
                    <li>Lead in glass components</li>
                    <li>Phosphor coating</li>
                    <li>Electronic ballasts</li>
                    <li>Metal end caps</li>
                  </>
                )}
                {product.category === "Industrial" && (
                  <>
                    <li>Industrial-grade capacitors</li>
                    <li>Heavy-duty transformers</li>
                    <li>Industrial coolants</li>
                    <li>High-voltage components</li>
                    <li>Industrial-grade plastics</li>
                  </>
                )}
                {(product.category === "Electronics" || product.category === "Audio" || product.category === "Wearables" || product.category === "Appliances") && (
                  <>
                    <li>Toxic metals (lead, mercury, cadmium)</li>
                    <li>Non-biodegradable plastics</li>
                    <li>Hazardous circuit boards</li>
                    <li>Chemical flame retardants</li>
                    <li>Lithium batteries</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 