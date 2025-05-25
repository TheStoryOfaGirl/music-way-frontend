import {
  useCheckAuth,
  useGetFoundMaterials,
  useGetMaterials,
  useGetThemes,
} from "@api";
import { Card, Loader, Search } from "@components/shared";
import { useLocation } from "react-router-dom";
import styles from "./Materials.module.css";
import { ChangeEvent, useState } from "react";
import { URLS, useDebounce } from "@utils";
import { LinkItem } from "@components/dummies";
import { ThemesModal } from "@components/widgets";
import { MaterialBlock } from "@models";

function Materials() {
  const [seacrh, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeBlock, setActiveBlock] = useState<
    Omit<MaterialBlock, "image_url">
  >({} as Omit<MaterialBlock, "image_url">);

  const debouncedValue = useDebounce(seacrh, 500);
  const location = useLocation();

  const { isLoading: isLoadingAuth, isSuccess: isSuccessAuth } = useCheckAuth(
    location.pathname,
  );
  const {
    isLoading: isLoadingMaterials,
    isSuccess: isSuccessMaterials,
    data: materials,
  } = useGetMaterials();
  const { isSuccess: isSuccessFoundMaterials, data: foundMaterials } =
    useGetFoundMaterials(debouncedValue);
  const { isSuccess: isSuccessThemes, data: themes } = useGetThemes(
    activeBlock.id,
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoadingAuth || isLoadingMaterials) return <Loader />;

  return (
    <>
      {isSuccessAuth && isSuccessMaterials && (
        <div className={styles.container}>
          <h1 className="heading_1">Учебные материалы</h1>
          <Search
            placeholder="Искать материалы..."
            className={styles.search}
            onChange={onSearch}
          />
          <div className={styles.search_container}>
            {isSuccessFoundMaterials && (
              <div className={styles.seacrh_result}>
                {foundMaterials.data.length > 0 ? (
                  <>
                    {foundMaterials.data.map((material) => (
                      <LinkItem
                        name={material.name}
                        path={`${URLS.MATERIALS}/${material.id}`}
                      />
                    ))}
                  </>
                ) : (
                  <p className="text_24_r">Ничего не найдено</p>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="heading_3">Разделы</h3>
            <div className={styles.card_list}>
              {materials.data.map((block) => (
                <Card
                  key={block.id}
                  name={block.name}
                  pathImage={block.image_url}
                  hover="up"
                  onClick={() => {
                    setActiveBlock({ id: block.id, name: block.name });
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          </div>
          {showModal && isSuccessThemes && (
            <ThemesModal
              name={activeBlock.name}
              themes={themes.data}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Materials;
