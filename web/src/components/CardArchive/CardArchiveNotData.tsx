import styles from "./CardArchiveNotData.module.scss";
import { ReactComponent as PageArrow } from "./../../imgs/pluse.svg";
import { ReactComponent as ArrowSmall } from "./../../imgs/ArrowSmall.svg";
import { useState, useRef } from "react";

function CardArchiveNotData(props: any) {
    const [activeCreate, setActiveCreate] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

    const options = [
        "Фото профиля",
        "Год рождения",
        "Удостоверение личности",
        "Населенный пункт откуда угнан на принудительные работы",
        "Адрес проживания до угона на принудительные работы в Германию",
        "Дата, место и причина смерти на момент пребывания в Германии",
        "Дата и место репатриации",
        "Адрес проживания после возвращения в СССР"
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileName(file.name);
            setSelectedFile(file);
            console.log("Uploaded File Type:", file.type); // Log the file type
        }
    };

    const handleOptionChange = (option: string) => {
        setSelectedOptions(prev => 
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    const handleSave = () => {
        const selectedIds = selectedOptions.map((_, index) => index + 1);
        const data = {
            file: selectedFile,
            options: selectedIds,
            id: props.dataHuman?.id
        }
        console.log("data", data);
    };

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the hidden file input
        }
    };

    return (
        <div className={styles.CardArchiveNotData}>
            <div className={styles.CardArchiveNotDataInner}>
                <div className={styles.blockAdd} onClick={() => setActiveCreate(!activeCreate)}>
                    <PageArrow />
                </div>
                {
                    activeCreate && (
                        <div className={styles.TypeAdd}>
                            <div className={styles.ArrowLeft} onClick={() => setActiveCreate(!activeCreate)}>
                                <ArrowSmall />
                            </div>
                            <div className={styles.TypeAddList}>
                                <p>Выберите пункты списка:</p>
                                <ul>
                                    {options.map(option => (
                                        <li key={option}>
                                            <label className={styles.customCheckbox}>
                                                <img src="./../img/complete.svg" alt="Complete"/>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.includes(option)}
                                                    onChange={() => handleOptionChange(option)}
                                                />
                                                <span className={styles.textOption}>
                                                    {option}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <p>Выберите фото:</p>
                                <div  className={styles.fileUploadContainerStreat}>
                                    <label className={styles.fileUploadContainer}> 
                                        <div onClick={handleFileInputClick} className={styles.fileUploadContainerblock}> </div>
                                        <input 
                                                placeholder="Ничего не выбранно" 
                                                value={fileName}  
                                                className={styles.fileUpload} 
                                                disabled
                                        />
                                        <input 
                                            type="file" 
                                            onChange={handleFileChange}  
                                            className={styles.fileUploadSecret} 
                                            ref={fileInputRef} // Attach the ref to the hidden input
                                        />
                                    </label>
                                    {/* <img className={styles.fileDeleteImg} src="./../img/CloseArrowRed.svg" alt="Complete"/> */}
                                </div>
                                <button onClick={handleSave}>Сохранить</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CardArchiveNotData;
