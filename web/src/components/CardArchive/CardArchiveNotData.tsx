import styles from "./CardArchiveNotData.module.scss";
import { ReactComponent as PageArrow } from "./../../imgs/pluse.svg";
import { ReactComponent as ArrowSmall } from "./../../imgs/ArrowSmall.svg";
import { useState, useRef, useEffect } from "react";
import { AddPhoto } from "../../api/ApiRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

function CardArchiveNotData(props: any) {
  const [activeCreate, setActiveCreate] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorFile, setErrorFile] = useState<string | null>("")
  const navigate = useNavigate();
  useEffect(() => { 
    if (store.selectedPerson === "" || store.selectedPerson === null) {
      navigate("/AdminPage/AdminSearchResult")
    } 
  }, []);


  const options = [
    "Фото профиля",
    "Удостоверение личности",
    "Профессия на момент отправки в Германиюe",
    "Адрес проживания до угона на принудительные работы в Германиюe",
    "Дата угона на принудительные работы в Германиюe",
    "Населенный пункт откуда угнан на принудительные работыe",
    "Место трудоиспользования на принудительных работах в Германииe",
    "Дата, место и причина смерти на момент пребывания в Германииe",
    "Дата и место репатриацииe",
    "Адрес проживания после возвращения в СССР ",
  ];
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("file", file.name.split(".")[file.name.split(".").length - 1]);
      if (file.size > 3 * 1024 * 1024) { // Check if file size exceeds 3MB
        setErrorFile("Слишком большой файл")
        setSelectedFile(null);
        setFileName("");
      }else if(!file){
        setErrorFile("Загрузите файл")
        setSelectedFile(null);
        setFileName("");
      } else if(file.name.split(".")[file.name.split(".").length - 1] !== "jpg" && file.name.split(".")[file.name.split(".").length - 1] !== "jpeg" && file.name.split(".")[file.name.split(".").length - 1] !== "png"){
        setErrorFile("Неверное расширение")
        setSelectedFile(null);
        setFileName("");
      }else {
        setErrorFile("")
        setFileName(file.name);
        setSelectedFile(file);
      }
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const store = useSelector((state: RootState) => state.peopleSlice);


  const checkSelected = () =>{
      setError(false);
  }
  const handleSave = () => {
    if (selectedOptions.length === 0) {
      setError(true);
      return;
    }else if(!selectedFile){
      setErrorFile("Загрузите файл!")
    }else{
      const selectedIds: number[] = selectedOptions
      .map((option) => options.indexOf(option))
      .filter((index) => index !== -1)
      .sort((a, b) => a - b);
    const formData = new FormData();

    selectedIds.forEach((id, index) => {
      formData.append(`types[${index}]`, `${id}`);
    });

    formData.append("id", store.selectedPerson as any);
    formData.append("file", selectedFile as Blob);

    AddPhoto(formData).then((resp) => {
      if (resp?.status === 200) {
        props.apiGetData();
        setSelectedOptions([]);
        setSelectedFile(null);
        setFileName("");
        props.funUpdatePeople();
      }
    });
  }

   
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.CardArchiveNotData}>
      <div className={styles.CardArchiveNotDataInner}>
        <div
          className={styles.blockAdd}
          onClick={() => setActiveCreate(!activeCreate)}
        >
          <PageArrow />
        </div>
        {activeCreate && (
          <div className={styles.TypeAdd}>
            <div
              className={styles.ArrowLeft}
              onClick={() => setActiveCreate(!activeCreate)}
            >
              <ArrowSmall />
            </div>
            <div className={styles.TypeAddList}>
              <p>Выберите пункты списка:</p>
              <ul className={error ? styles.errorList : ''}>
              {options.map((option) => (
                  <li key={option}>
                      <label className={styles.customCheckbox}>
                          <img src="./../img/complete.svg" alt="Complete" />
                          <input
                              type="checkbox"
                              checked={selectedOptions.includes(option)}
                              onChange={() => { handleOptionChange(option); checkSelected(); }}
                          />
                          <span className={`${styles.textOption} ${error && !selectedOptions.includes(option) ? styles.errorLi : ''}`}>
                              {option}
                          </span>
                      </label>
                  </li>
              ))}

              </ul>
              <div className={styles.fileContainerStreat}>
                <p>Выберите фото:</p>
                <div className={styles.fileUploadContainerStreat}>
                  <label className={styles.fileUploadContainer}>
                    <div
                      onClick={handleFileInputClick}
                      className={styles.fileUploadContainerblock}
                    >
                      {" "}
                    </div>
                    <input
                      placeholder="Ничего не выбранно(.jpg, .jpeg, .png)"
                      value={fileName}
                      className={`${styles.fileUpload} ${error && !selectedFile ? styles.errorInput : ''}`}
                      disabled
                    />
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                      className={styles.fileUploadSecret}
                      ref={fileInputRef}
                    />

                  </label>
                  {errorFile != "" && <p className={styles.errorFile}>{errorFile}</p>}

                </div>
              </div>
              <button onClick={handleSave}>Сохранить</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardArchiveNotData;