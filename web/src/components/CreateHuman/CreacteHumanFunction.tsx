import axios from "axios";

const searchAddress = async (query: string) => {
  if (query) {
    try {
      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=f3c78576-996b-4eaa-84f8-12a8520d276a&geocode=${encodeURIComponent(
          query
        )}&kind=district`
      );
      const features = response.data.response.GeoObjectCollection.featureMember;
      const addressList: string[] = [];
      for (const feature of features) {
        const addressComponent = [
          feature.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails
            ?.Country?.AddressLine,
          feature.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails
            ?.Thoroughfare?.ThoroughfareName,
          feature.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails
            ?.Premise?.PremiseNumber,
        ]
          .filter(Boolean)
          .join(", ");
        if (addressComponent) {
          addressList.push(addressComponent);
        }
      }
      if (addressList.length === 0) {
        console.error("Не найдено ни одного адреса");
        //   setAddressList([]);
      } else {
        //   setAddressList(addressList);
      }
    } catch (error) {
      console.error("Ошибка получения адреса", error);
    }
  }
};
