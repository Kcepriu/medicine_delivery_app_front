import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useOrder } from "../../hooks/contextOrder";
import { getShopsById, getAddressByLocation } from "../../services/apiBackend";
import styles from "./Map.module.scss";
import { useGeolocated } from "react-geolocated";

interface ILocation {
  lat: number;
  lng: number;
}
interface IProps {
  setAddress: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
}

const Map: FC<IProps> = ({ setAddress, setLocation }) => {
  const { order } = useOrder();

  const [response, setResponse] = useState(null);
  // console.log("🚀 ~ response:", response);

  const [locationBuyer, setLocationBuyer] = useState<ILocation | undefined>();
  const [locationStore, setLocationStore] = useState<ILocation | undefined>();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setLocationBuyer({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  useEffect(() => {
    if (!locationBuyer) return;

    setLocation(`${locationBuyer.lat}, ${locationBuyer.lng}`);

    const controller = new AbortController();

    const load = async () => {
      try {
        const addr = await getAddressByLocation(
          String(locationBuyer.lat),
          String(locationBuyer.lng),
          controller
        );
        setAddress(addr);
      } catch (Error) {
        setAddress("");
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [locationBuyer, setAddress, setLocation]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const { location } = await getShopsById(order.shop, controller);

        const arrLocation = location.split(",");

        setLocationStore({
          lat: Number(arrLocation[0]),
          lng: Number(arrLocation[1]),
        });
      } catch (Error) {
        setLocationStore({
          lat: 50.46993065494816,
          lng: 30.501830359078916,
        });
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [order.shop]);

  const directionsCallback = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      }
    }
  };

  const onLoad = (marker: any) => {
    // console.log("marker: ", marker);
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat() && e.latLng?.lng()) {
      setLocationBuyer({
        lat: e.latLng?.lat(),
        lng: e.latLng?.lng(),
      });
      setResponse(null);
    }
  };

  return (
    <div className={styles.WrapMap}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY || ""}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={locationStore}
          zoom={13}
          onClick={onClick}
        >
          {locationBuyer && <Marker onLoad={onLoad} position={locationBuyer} />}

          {locationStore && <Marker onLoad={onLoad} position={locationStore} />}

          {!response && locationStore && locationBuyer && (
            <DirectionsService
              options={{
                destination: locationStore,
                origin: locationBuyer,
                //@ts-ignore
                travelMode: "WALKING",
              }}
              callback={directionsCallback}
            />
          )}
          {response && (
            <DirectionsRenderer
              // required
              options={{
                directions: response,
              }}
              routeIndex={0}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
