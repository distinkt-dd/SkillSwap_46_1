import styles from "./Subcategory.module.css";
import React from "react";
import "../../../index.css";

export type TSubcategoryProps = {
  type:
    | "business"
    | "languages"
    | "creative"
    | "education"
    | "home"
    | "health"
    | "other";
  title: string;
};

export const Subcategory: React.FC<TSubcategoryProps> = (
  props: TSubcategoryProps,
) => {
  const { title, type } = props;
  const getTagClass = (type: string) => {
    switch (type) {
      case "business":
        return styles.tagBusiness;
      case "creative":
        return styles.tagCreative;
      case "languages":
        return styles.tagLanguages;
      case "education":
        return styles.tagEducation;
      case "home":
        return styles.tagHome;
      case "health":
        return styles.tagHealth;
      default:
        return styles.tagOther;
    }
  };

  return (
    <div className={`${styles.div} ${getTagClass(type)}`}>
      <p>{title}</p>
    </div>
  );
};
