import React from 'react';
import Layout from '@theme/Layout';
import RAGInterface from '../components/RAGInterface';

export default function RAGPage() {
  return (
    <Layout title="RAG Interface" description="Research Assistant with Retrieval Augmented Generation">
      <RAGInterface />
    </Layout>
  );
}