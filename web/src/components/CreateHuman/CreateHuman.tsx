import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateHuman.module.scss";

type Inputs = {
  firstName: string;
  lastName: string;
  patronumic: string;
  burthDate: Date;
  profession: string;
  adressWorked: string;
  aresDosygon: string;
  daterepatriation: string;
  adress: string;
  dateygon: string;
  aressygon: string;
  aresDeat: string;
  photo: File;
  additionalFiles: File[];
};

export default function CreateHuman() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.photo = fileData;
    data.additionalFiles = additionalFiles;
    console.log(data);
    
    reset();
    setSelectedFileName("");
    setAdditionalFileNames([]);
    setDataSaved(true);
  };

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [additionalFileNames, setAdditionalFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFilesInputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File>({} as File);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [DataSaved, setDataSaved] = useState<boolean>(false);
  const [DataNotSaved, setDataNotSaved] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileData(file);
      setSelectedFileName(file.name);
    }
  };

  const handleAdditionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setAdditionalFiles(fileArray);
      setAdditionalFileNames(fileArray.map((file) => file.name));
    }
  };

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectAdditionalFilesClick = () => {
    if (additionalFilesInputRef.current) {
      additionalFilesInputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    setAdditionalFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setAdditionalFileNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.CreateHuman}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.blockInput}>
          <div className={styles.blockFormFirst}>
            <input
              placeholder="Фамилия"
              maxLength={50}
              {...register("lastName", { required: true, maxLength: 50 })}
            />
            <input
              placeholder="Отчество"
              maxLength={50}
              {...register("patronumic", { required: true, maxLength: 20 })}
            />
            <input
              placeholder="Имя"
              maxLength={50}
              {...register("firstName", { required: true, maxLength: 50 })}
            />
            <input
              placeholder="Год рождения"
              maxLength={50}
              {...register("burthDate", { required: true, maxLength: 50 })}
              type="date"
            />
            <input
              placeholder="Профессия на момент отправки в Германию"
              maxLength={50}
              {...register("profession", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Место трудоиспользования"
              maxLength={50}
              {...register("adressWorked", { required: false, maxLength: 50 })}
            />
          </div>
          <div className={styles.blockFormSecond}>
            <input
              placeholder="Населенный пункт откуда угнан на принудительные работы"
              maxLength={50}
              {...register("aressygon", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Адрес проживания до угона на принудительные работы в Германию"
              maxLength={50}
              {...register("aresDosygon", { required: false, maxLength: 20 })}
            />
            <input
              placeholder="Дата и место репатриации"
              maxLength={50}
              {...register("daterepatriation", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Адрес проживания после возвращения в СССР"
              maxLength={50}
              {...register("adress", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Дата, место и причина смерти на момент пребывания в Германии"
              maxLength={50}
              {...register("aresDeat", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Добавить фото"
              maxLength={50}
              value={selectedFileName}
              readOnly
              onClick={handleSelectFileClick} // Trigger file input click on input click
            />
            <div className={styles.SelectFile} onClick={handleSelectFileClick}>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef} // Reference to the file input element
                style={{ display: "none" }} // Hide the file input
                title=""
              />
              <div className={styles.SelectFile__img}>
                <p>jpg, png</p>
                <img src="./../../img/file.svg" />
              </div>
            </div>
            <input
              type="file"
              multiple
              onChange={handleAdditionalFilesChange}
              ref={additionalFilesInputRef}
              style={{ display: "none" }}
            />
            <div className={styles.SelectFile__multiple}>
              <div className={styles.SelectFile__multiple__text}>
                {additionalFileNames.map((fileName, index) => (
                  <div key={index} className={styles.SelectFile__multiple__containerNameFile}>
                    <p>{fileName}</p>
                    <img
                      src="./../../img/CloseArrowRed.svg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click event
                        handleRemoveFile(index);
                      }}
                      alt="Remove file"
                    />
                  </div>
                ))}
                {additionalFileNames.length === 0 && (
                  <p className={styles.SelectFile__multiple__textNotData}>Личный архив файлов</p>
                )}
              </div>
              <div className={styles.SelectFile__multiple__img} onClick={handleSelectAdditionalFilesClick}>
                <p>jpg, png, jpeg </p>
                <img src="./../../img/file.svg" />
              </div>
            </div>
            <div className={styles.SubmitButton}>
              <input type="submit" value="Сохранить" />
            </div>
            {DataSaved && (
              <div className={styles.DataSave}>
                <p>Данные успешно сохранены*</p>
                <img onClick={() => setDataSaved(false)} src="./../../img/CloseArrowGreen.svg" />
              </div>
            )}
            {DataNotSaved && (
              <div className={styles.DataNotSave}>
                <p>Данные не сохранены, проверьте заполненные поля*</p>
                <img onClick={() => setDataNotSaved(false)} src="./../../img/CloseArrowRed.svg" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
