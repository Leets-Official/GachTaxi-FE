const getCenterPoint = (origin: string, destination: string) => {
  const [originLng, originLat] = origin.split(',').map(Number);
  const [destinationLng, destinationLat] = destination.split(',').map(Number);

  const centerLat = (originLat + destinationLat) / 2;
  const centerLng = (originLng + destinationLng) / 2;

  return { lat: centerLat, lng: centerLng };
};

export default getCenterPoint;
