import { Schema, model } from "mongoose";

let schema: Schema = new Schema({
  _id: String,
  DRGDefinition: String,
  providerId: String,
  providerName: String,
  providerStreetAddress: String,
  providerCity: String,
  providerState: String,
  providerZipCode: String,
  hospitalReferralRegionDescription: String,
  totalDischarges: Number,
  averageCoveredCharges: String,
  averageTotalPayments: String,
  averageMedicarePayments: String
});

export default model("ippsprovides", schema);
