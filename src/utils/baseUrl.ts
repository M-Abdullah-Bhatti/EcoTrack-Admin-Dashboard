const environment: String = "dev";
// const environment = "production";

let baseUrl: String;
if (environment === "production") {
  baseUrl = "https://ecotrack-dev.vercel.app";
} else {
  baseUrl = "http://localhost:5000";
}

export default baseUrl;
