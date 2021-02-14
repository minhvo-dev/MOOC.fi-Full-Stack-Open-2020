import dotenv from "dotenv";

dotenv.config();

export interface ConfigType {
  dbUri: string;
  port: string;
  nodeEnv: string;
}

const config : ConfigType = {
  dbUri: process.env.DB_URI || "",
  port: process.env.PORT || "3001",
  nodeEnv: process.env.NODE_ENV || "production"
};

export default config;
