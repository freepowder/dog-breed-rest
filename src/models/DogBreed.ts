import { Schema, model, Document } from 'mongoose';

// Define the interface for a DogBreed document
export interface IDogBreed extends Document {
  name?: string;
  origin?: string;
  description?: string;
}

// Define the DogBreed schema
const DogBreedSchema: Schema = new Schema({
  name: { type: String, required: true },
  origin: { type: String },
  description: { type: String },
});

// Export the model
export default model('DogBreed', DogBreedSchema);
