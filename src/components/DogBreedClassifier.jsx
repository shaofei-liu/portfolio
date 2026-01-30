import './DogBreedClassifier.css';

export default function DogBreedClassifier() {
  return (
    <div className="dog-breed-classifier" style={{ padding: '20px' }}>
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '900px',
        position: 'relative',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <iframe
          src="https://williamcass-dog-breed-classification.hf.space/?embedded=true"
          title="Dog Breed Classifier"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          allow="clipboard-read clipboard-write"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
