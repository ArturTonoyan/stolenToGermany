import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateHuman.module.scss";
import { apiGetAdress, apiGetOstarbaiter } from "../../api/ApiRequest";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AddressSuggestions } from "react-dadata";
type Inputs = {
  name: string;
  surname: string;
  patronymic: string;
  date: string;
  dateDeparture: string;
  profession: string;
  localityWork: string;
  localityDeparture: string;
  departure: string;
  infoOfRepatriation: string;
  addressAfterReturning: string;
  infoOfDeath: string;
};

export default function CreateHuman(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>();
  const [data, setData] = useState<any>();
  const suggestionsRef = useRef<AddressSuggestions>(null);
  const localityDepartureRef = useRef<AddressSuggestions>(null);
  const addressAfterReturningRef = useRef<AddressSuggestions>(null);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (
      store.selectedPerson != undefined &&
      location.pathname !== "/AdminPage/AdminPanelModule"
    ) {
      SetDataResp();
    }
  }, []);
  // const [addressList, setAddressList] = useState<string[]>([]); //adressList

  const store = useSelector((state: RootState) => state.peopleSlice);
  const SetDataResp = () => {
    apiGetOstarbaiter(store.selectedPerson).then((res) => {
      res && setData(FormatedData(res?.data?.ostarbaiter));
    });
  };

  const FormatedData = (data: any) => {
    return {
      name: data?.name || "",
      surname: data?.surname || "",
      patronymic: data?.patronymic || "",
      date: data?.date || "",
      dateDeparture: data?.dateDeparture || "",
      profession: data?.profession || "",
      localityWork: data?.localityWork || "",
      localityDeparture: data?.localityDeparture || "",
      departure: data?.departure || "",
      infoOfRepatriation: data?.infoOfRepatriation || "",
      addressAfterReturning: data?.addressAfterReturning || "",
      infoOfDeath: data?.infoOfDeath || "",
    };
  };

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const setDatas = (date: any) => {
    setValue("surname", date?.surname || "");
    setValue("name", date?.name || "");
    setValue("patronymic", date?.patronymic || "");
    setValue("date", date?.date || "");
    setValue("departure", date?.departure || "");
    setValue("profession", date?.profession || "");
    setValue("localityDeparture", date?.localityDeparture || "");
    setValue("dateDeparture", date?.dateDeparture || "");
    setValue("localityWork", date?.localityWork || "");
    setValue("infoOfDeath", date?.infoOfDeath || "");
    setValue("infoOfRepatriation", date?.infoOfRepatriation || "");
    setValue("addressAfterReturning", date?.addressAfterReturning || "");
  };
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  function isValid(value: string, key: string) {
    // Проверяем, что строка не содержит цифр и английских букв
    const regex = /^[А-Яа-яЁё\s-]+$/;
    const regex2 = /^[А-Яа-яЁё0-9\s/_,.()-]+$/;
    if (key === "name" || key === "surname" || key === "patronymic") {
      return regex.test(value);
    } else if (
      key !== "date" &&
      key !== "dateDeparture" &&
      key !== "localityWork"
    ) {
      return regex2.test(value);
    } else {
      const date = Number(value);
      if (date < 1845 || date > 1946) {
        return false;
      } else {
        return true;
      }
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setErrorText("");
    const dete = FormatedData(data);
    let Error = false;
    for (const key of Object.keys(dete) as (keyof Inputs)[]) {
      if (dete[key] !== "") {
        if (!isValid(dete[key], key)) {
          // console.log(`${key} содержит недопустимые символы.`);
          Error = true;
          setErrorMessage((prev) => [...prev, key]);
        } else {
          setErrorMessage((prev) => prev.filter((item) => item !== key));
        }
      }
    }
    if (!Error && !Object.values(dete).every((value) => value === "")) {
      props
        .funcCreate(dete)
        .then((res: any) => {
          if (res?.status === 200 && res.type === "edit") {
            reset(props.dete);
            SetDataResp();
          }
          if (res?.status === 200) {
            reset();
            if (suggestionsRef.current) {
              suggestionsRef.current.setInputValue("");
            }
            if (localityDepartureRef.current) {
              localityDepartureRef.current.setInputValue("");
            }
            if (addressAfterReturningRef.current) {
              addressAfterReturningRef.current.setInputValue("");
            }
            setDataSaved(true);
          } else {
            setDataNotSaved(true);
          }
        })
        .catch((error: any) => {
          if (error?.response?.status === 401) {
            props.setAutorization("");
            sessionStorage.removeItem("access_token");
          } else {
            setDataNotSaved(true);
            setErrorText(
              "Введите корректное место трудоустройства в Третьем рейхе*"
            );
          }
        });
    } else {
      setDataNotSaved(true);
    }
  };
  const [DataSaved, setDataSaved] = useState<boolean>(false);
  const [DataNotSaved, setDataNotSaved] = useState<boolean>(false);

  //! устанавливаем занчения для адресов
  //! 1
  const handleClick = () => {
    if (suggestionsRef.current) {
      suggestionsRef.current.setInputValue(data?.departure || "");
    }
  };
  useEffect(() => {
    handleClick();
  }, [suggestionsRef, data, props.data]);

  //! 2
  const handleClick2 = () => {
    if (localityDepartureRef.current) {
      localityDepartureRef.current.setInputValue(data?.localityDeparture || "");
    }
  };
  useEffect(() => {
    handleClick2();
  }, [localityDepartureRef, data, props.data]);

  //! 3
  const handleClick3 = () => {
    if (addressAfterReturningRef.current) {
      addressAfterReturningRef.current.setInputValue(
        data?.addressAfterReturning || ""
      );
    }
  };
  useEffect(() => {
    handleClick3();
  }, [addressAfterReturningRef, data, props.data]);

  //!------------------------------------

  const funSetAddress = (e: any, key: any) => {
    setValue(key, e.value);
  };

  const funSetAddressInput = (e: any, key: any) => {
    setValue(key, e.target.value);
    if (!isValid(e.target.value, key) && e.target.value !== "") {
      // console.log(`${key} содержит недопустимые символы.`);
      setErrorMessage((prev) => [...prev, key]);
    } else {
      setErrorMessage((prev) => prev.filter((item) => item !== key));
    }
  };

  return (
    <div className={styles.CreateHuman}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.blockInput}>
          <div className={styles.blockFormFirst}>
            <input
              placeholder="Фамилия*"
              defaultValue={props.data?.surname || ""}
              className={`${errors.surname ? styles.inputError : ""}`}
              maxLength={50}
              {...register("surname", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("surname") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
            <input
              placeholder="Имя"
              defaultValue={props.data?.name || ""}
              maxLength={50}
              {...register("name", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("name") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}

            <input
              placeholder="Отчество"
              defaultValue={props.data?.patronymic || ""}
              maxLength={50}
              {...register("patronymic", { required: false, maxLength: 20 })}
            />
            {errorMessage.includes("patronymic") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
            <input
              placeholder="Год рождения*"
              className={`${errors.date ? styles.inputError : ""}`}
              type="number"
              defaultValue={props.data?.date || ""}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                // Remove unwanted characters
                input.value = input.value.replace(/[-+eE]/g, "");
                // Limit input to 4 digits
                if (input.value.length > 4) {
                  input.value = input.value.slice(0, 4);
                }
              }}
              {...register("date", {
                required: false,
                pattern: /^[0-9]{4}$/, // Ensures only 4 digits are allowed
              })}
            />
            {errorMessage.includes("date") && (
              <p className={styles.errorMessage}>
                Год должен быть больше 1845 и меньше 1946
              </p>
            )}

            {/* <input
              className={styles.biginp}
              placeholder="Адрес проживания до угона на принудительные работы в Германию"
              maxLength={50}
              defaultValue={props.data?.departure || ""}
              {...register("departure", { required: false, maxLength: 20 })}
            /> */}
            <div className={styles.address}>
              <AddressSuggestions
                ref={suggestionsRef}
                key={"departure"}
                token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                onChange={(e) => funSetAddress(e, "departure")}
                inputProps={{
                  id: "departure",
                  placeholder:
                    "Адрес проживания до угона на принудительные работы в Германию",
                  onChange: (e) => funSetAddressInput(e, "departure"),
                }}
              />
            </div>
            {errorMessage.includes("departure") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
            <input
              placeholder="Профессия на момент отправки в Германию"
              maxLength={50}
              defaultValue={props.data?.profession || ""}
              {...register("profession", { required: false, maxLength: 100 })}
            />
            {errorMessage.includes("profession") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
            {/* <input
              placeholder="Населенный пункт откуда угнан на принудительные работы"
              maxLength={50}
              defaultValue={props.data?.localityDeparture || ""}
              {...register("localityDeparture", {
                required: false,
                maxLength: 50,
              })}
            /> */}
            <div className={styles.address}>
              <AddressSuggestions
                ref={localityDepartureRef}
                key={"localityDeparture"}
                token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                onChange={(e) => funSetAddress(e, "localityDeparture")}
                inputProps={{
                  id: "localityDeparture",
                  placeholder:
                    "Населенный пункт откуда угнан на принудительные работы",
                  onChange: (e) => funSetAddressInput(e, "localityDeparture"),
                }}
              />
            </div>
            {errorMessage.includes("localityDeparture") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
          </div>
          <div className={styles.blockFormSecond}>
            <input
              placeholder="Год угона"
              maxLength={4}
              type="number"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                // Remove unwanted characters
                input.value = input.value.replace(/[-+eE]/g, "");
                // Limit input to 4 digits
                if (input.value.length > 4) {
                  input.value = input.value.slice(0, 4);
                }
              }}
              defaultValue={props.data?.dateDeparture || ""}
              {...register("dateDeparture", {
                required: false,
                maxLength: 4,
                pattern: /^[0-9]{4}$/,
              })}
            />
            {errorMessage.includes("dateDeparture") && (
              <p className={styles.errorMessage}>
                Год должен быть больше 1845 и меньше 1946
              </p>
            )}
            <input
              placeholder="Место трудоиспользования в Третьем рейхе"
              maxLength={100}
              defaultValue={props.data?.localityWork || ""}
              {...register("localityWork", { required: false, maxLength: 100 })}
            />
            {(errorMessage.includes("localityWork") || errorText) && (
              <p className={styles.errorMessage}>
                {errorText || "Поле содержит недопустимые символы."}
              </p>
            )}
            <input
              placeholder="Дата, место и причина смерти на момент пребывания в Германии"
              maxLength={100}
              defaultValue={props.data?.infoOfDeath || ""}
              {...register("infoOfDeath", { required: false, maxLength: 100 })}
            />
            {errorMessage.includes("infoOfDeath") && (
              <p className={styles.errorMessage}>
                Поле содержит недопустимые символы.
              </p>
            )}
            <input
              placeholder="Дата и место репатриации"
              maxLength={100}
              defaultValue={props.data?.infoOfRepatriation || ""}
              {...register("infoOfRepatriation", {
                required: false,
                maxLength: 100,
              })}
            />
            {/* <input
              placeholder="Адрес проживания после возвращения в СССР"
              maxLength={50}
              defaultValue={props.data?.addressAfterReturning || ""}
              {...register("addressAfterReturning", {
                required: false,
                maxLength: 50,
              })}
            /> */}
            <div className={styles.address}>
              <AddressSuggestions
                ref={addressAfterReturningRef}
                key={"addressAfterReturning"}
                token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                // value={adressA}
                onChange={(e) => funSetAddress(e, "addressAfterReturning")}
                inputProps={{
                  id: "addressAfterReturning",
                  placeholder: "Адрес проживания после возвращения в СССР",
                  onChange: (e) =>
                    funSetAddressInput(e, "addressAfterReturning"),
                }}
              />
            </div>

            {location.pathname === "/AdminPage/EditHumanModule" && (
              <>
                <div className={styles.archive}>
                  <div>
                    <Link to="/AdminPage/AdminPageEditArchiveModule">
                      <p>
                        Редактировать личный архив{" "}
                        <img src="./../img/Files.svg" />
                      </p>
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className={styles.SubmitButton}>
              <input type="submit" value="Сохранить" />
            </div>
            {location.pathname !== "/AdminPage/EditHumanModule" && (
              <>
                <div className={styles.Button}>
                  <Link to="/AdminPage/AdminSearchResult">
                    <button>Редактирование существующей информации</button>
                  </Link>
                </div>
              </>
            )}
            {DataSaved && (
              <div className={styles.DataSave}>
                <p>Данные успешно сохранены*</p>
                <img
                  onClick={() => setDataSaved(false)}
                  src="./../../img/CloseArrowGreen.svg"
                />
              </div>
            )}
            {DataNotSaved && (
              <div className={styles.DataNotSave}>
                <p>Данные не сохранены, проверьте заполненные поля*</p>
                <img
                  onClick={() => setDataNotSaved(false)}
                  src="./../../img/CloseArrowRed.svg"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
