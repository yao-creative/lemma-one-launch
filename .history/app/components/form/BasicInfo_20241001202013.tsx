import React, { useState } from 'react';
import FormDataInput from './FormDataInput';
import { FormData } from '../WaitListForm';

interface BasicInfoProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  return (
    <FormDataInput formData={formData} setFormData={setFormData} />
  );
};

export default BasicInfo;