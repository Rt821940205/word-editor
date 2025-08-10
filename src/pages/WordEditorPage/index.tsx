// src/pages/WordEditorPage/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Space, Spin } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchWordById } from '../../api';
import jsPDF from 'jspdf';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const { Title } = Typography;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image',
];

const WordEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>('viewer');
  const quillRef = useRef<any>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }

    const fetchWord = async () => {
      try {
        const word = await fetchWordById(id!);
        setContent(word.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, [id]);

  const handleExportToWord = () => {
    const blob = new Blob([content], { type: 'application/html' });
    mammoth.convertToHtml({ path: URL.createObjectURL(blob) })
      .then(result => {
        const htmlContent = result.value;
        const doc = new File([htmlContent], `document_${id}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(doc, `document_${id}.docx`);
      })
      .catch(err => console.error(err));
  };

  const handleExportToPDF = () => {
    if (quillRef.current) {
      const editorElement = quillRef.current.querySelector('.ql-editor');
      if (editorElement) {
        html2canvas(editorElement).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`document_${id}.pdf`);
        });
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Edit Word Document</Title>
      <Spin spinning={loading}>
        <div ref={quillRef}>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            readOnly={role !== 'admin'}
          />
        </div>
        <Space style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleExportToWord}>
            Export to Word
          </Button>
          <Button type="primary" onClick={handleExportToPDF}>
            Export to PDF
          </Button>
        </Space>
      </Spin>
    </div>
  );
};

export default WordEditorPage;