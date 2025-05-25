import {
  useCheckAuth,
  useGetTrainingSimulator,
  useGetTrainingSimulators,
} from "@api";
import styles from "./TrainingSimulators.module.css";
import { useLocation } from "react-router-dom";
import { Card, Loader } from "@components/shared";
import { useState } from "react";
import { TrainingSimulatorModal } from "@components/widgets";

function TrainingSimulators() {
  const location = useLocation();
  const [activeVariantId, setActiveVariantId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );
  const {
    isSuccess: isSuccessTrainingSimulators,
    data: trainingSimulators,
    isLoading: isLoadingTrainingSimulators,
  } = useGetTrainingSimulators();
  const { isSuccess: isSuccessTrainingSimulator, data: trainingSimulator } =
    useGetTrainingSimulator(activeVariantId);
  if (isLoadingAuth || isLoadingTrainingSimulators) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessTrainingSimulators && (
        <>
          <div className={styles.container}>
            <h1 className="heading_1">Тренажёры</h1>
            {trainingSimulators.data.map((simulator) => (
              <div
                key={simulator.block_name}
                className={styles.simulator_container}
              >
                <h3 className="heading_3">{simulator.block_name}</h3>
                <div className={styles.variants_list}>
                  {simulator.variants.map((variant) => (
                    <Card
                      key={variant.id}
                      name={variant.name}
                      pathImage={variant.image_url}
                      hover="outline"
                      onClick={() => {
                        setActiveVariantId(variant.id);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {isSuccessTrainingSimulator && (
            <TrainingSimulatorModal
              {...trainingSimulator.data}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default TrainingSimulators;
