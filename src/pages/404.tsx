import React from "react";
import { Layout } from "../components";
import SEO from "../components/Seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" description="Blog" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
