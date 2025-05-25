import { FormProvider, useForm } from "react-hook-form";
import styles from "./TabFeedback.module.css";
import { Button, Textarea } from "@components/shared";
import { useCheckAuth, usePostFeedbackByTheme } from "@api";
import { FeedbackData } from "@models";
import { classnames } from "@utils";
import { useLocation, useParams } from "react-router-dom";

export const TabFeedback = () => {
  const { id } = useParams();
  const location = useLocation();
  const { isSuccess: isSuccessAuth } = useCheckAuth(location.pathname);
  const { mutate, isPending, isSuccess } = usePostFeedbackByTheme();
  const onSubmit = (data: FeedbackData) =>
    mutate({ ...data, material_id: id as string });
  const methods = useForm<FeedbackData>();
  return (
    <>
      {isSuccessAuth && (
        <div className={styles.tab}>
          <p className={classnames("text_24_m", styles.text)}>
            Если заметили ошибку или у вас есть идеи для улучшения материалов,
            пожалуйста, напишите об этом. Ваше мнение помогает сделать наш
            сервис лучше!
          </p>
          {isSuccess && (
            <p className={classnames("text_24_m", styles.message_success)}>
              Комментарий отправлен, спасибо!
            </p>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <Textarea
                name="comment"
                color="blue"
                rows={7}
                placeholder="Напишите комментарий..."
                rules={{
                  required: "Поле обязательно для заполнения",
                }}
              />
              <Button
                className={classnames(styles.btn, "text_20_b")}
                type="submit"
                color="purple"
                disabled={isPending}
              >
                {isPending ? "Загрузка..." : "Отправить"}
              </Button>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};
