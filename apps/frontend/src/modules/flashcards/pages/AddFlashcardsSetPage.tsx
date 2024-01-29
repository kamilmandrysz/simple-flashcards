'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/20/solid';
import { LanguageEnum } from '@flashcards/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, array, InferType } from 'yup';

import { useNotifications } from '@frontend/shared/context';
import {
  BaseTextField,
  Button,
  Card,
  CardHeader,
  IconButton,
  PageHeadingWithAction,
  FormSelect,
  SelectOption,
} from '@frontend/components';
import { handleFormErrors, isEmptyObject, routes } from '@frontend/utils';
import { CreateFlashcardSetPayload, createFlashcardSet } from '@frontend/api';

type Form = {
  name: string;
  originalLanguage: SelectOption | null;
  destinationLanguage: SelectOption | null;
  flashcards: {
    term: string;
    translation: string;
  }[];
};

const formSchema = object().shape({
  name: string().required('Name is required'),
  originalLanguage: object()
    .shape({
      value: string().required(),
      label: string().required(),
    })
    .nullable()
    .test(
      'original-is-not-null',
      'Term language is required',
      (originalLanguage: SelectOption | null) => originalLanguage !== null
    ),
  destinationLanguage: object()
    .shape({
      value: string().required(),
      label: string().required(),
    })
    .nullable()
    .test(
      'destination-is-not-null',
      'Translation language is required',
      (destinationLanguage: SelectOption | null) => destinationLanguage !== null
    ),
  flashcards: array()
    .of(
      object().shape({
        term: string().required('Term is required.'),
        translation: string().required('Translation is required.'),
      })
    )
    .required(),
});

const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: LanguageEnum.ENGLISH, label: 'English' },
  { value: LanguageEnum.FRENCH, label: 'French' },
  { value: LanguageEnum.GERMAN, label: 'German' },
  { value: LanguageEnum.POLISH, label: 'Polish' },
  { value: LanguageEnum.SPANISH, label: 'Spanish' },
];

export const AddFlashcardSet = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      originalLanguage: null,
      destinationLanguage: null,
      name: '',
      flashcards: [
        {
          term: '',
          translation: '',
        },
        {
          term: '',
          translation: '',
        },
      ],
    },
    resolver: yupResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray<Form, 'flashcards'>({
    control: control as Control<Form>,
    name: 'flashcards',
  });
  const { showNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: InferType<typeof formSchema>) => {
    setIsLoading(true);

    const flashcards: Record<string, string> = {};

    data.flashcards.forEach((flashcard) => {
      flashcards[flashcard.term] = flashcard.translation;
    });

    const formData: CreateFlashcardSetPayload = {
      flashcards,
      name: data.name,
      originalLanguage: data.originalLanguage?.value as LanguageEnum,
      targetLanguage: data.destinationLanguage?.value as LanguageEnum,
    };

    try {
      await createFlashcardSet(formData);

      showNotification('success', 'Flashcards set created successfully!');
      router.push(routes.FLASHCARDS.url);
    } catch (e) {
      handleFormErrors(e, setError, showNotification);
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <PageHeadingWithAction
        heading="Create flashcard set"
        actions={
          <Button
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!isEmptyObject(errors) || isLoading}
          >
            Create
          </Button>
        }
      />
      <div className="mb-8 flex flex-col gap-4">
        <BaseTextField label="Name" error={errors?.name?.message} {...register('name')} />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <FormSelect
            control={control}
            options={LANGUAGE_OPTIONS}
            name="originalLanguage"
            label="Term language"
          />
          <FormSelect
            control={control}
            label="Translation language"
            options={LANGUAGE_OPTIONS}
            name="destinationLanguage"
          />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4">
        {fields.map((field, index) => (
          <Card className="pb-8" key={field.key}>
            <CardHeader
              heading={index + 1}
              className="mb-6 border-b pb-2"
              actions={
                <>
                  <IconButton
                    className="text-primary !shadow-none"
                    color="transparent"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-5 w-5 text-current" />
                  </IconButton>
                </>
              }
            />
            <div className="flex flex-col gap-4 md:flex-row">
              <BaseTextField
                label="Term"
                error={errors?.flashcards?.[index]?.term?.message}
                {...register(`flashcards.${index}.term`)}
              />
              <BaseTextField
                label="Translation"
                error={errors?.flashcards?.[index]?.translation?.message}
                {...register(`flashcards.${index}.translation`)}
              />
            </div>
          </Card>
        ))}
      </div>
      <Button
        className="mb-6 w-full"
        variant="outlined"
        onClick={() => append({ term: '', translation: '' })}
      >
        Add flashcard
      </Button>
      <Button
        className="w-[200px] self-end"
        type="submit"
        isLoading={isLoading}
        disabled={!isEmptyObject(errors) || isLoading}
      >
        Create
      </Button>
    </form>
  );
};
