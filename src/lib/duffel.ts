import { Duffel } from "@duffel/api";

const duffelAccessToken = process.env.DUFFEL_ACCESS_TOKEN;

if (!duffelAccessToken) {
  throw new Error(
    "Duffel access token not found in the environment variables."
  );
}

const duffel = new Duffel({
  token: duffelAccessToken,
});

export default duffel;
