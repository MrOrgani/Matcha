import React, { useContext } from "react";
import { Tag } from "antd";
import { ProfileFormContext } from "./../ProfileFormContext";

const hobbiesList = [
  "La lecture",
  "Les jeux de société et jeux de réflexion",
  "La promenade",
  "L’apprentissage d’une nouvelle langue",
  "Le tricot",
  "La cuisine",
  "Regarder la télévision",
  "Prendre soin de soi",
  "Faire le ménage",
  "Le bricolage",
  "Le jardinage",
  "Écouter de la musique",
  "Nager",
  "Le bénévolat",
  "L’astronomie",
  "S’occuper de son animal de compagnie",
  "Voyager",
  "Le modélisme",
  "L’Origami",
  "Apprendre à jouer d’un instrument de musique",
  "La couture",
  "Visiter les monuments historiques",
  "Aller au théâtre",
  "Le karting",
  "Le karaoké",
  "Le paintball",
  "La peinture",
  "Le rubik’s cube",
  "Le vide-grenier",
  "Aller au cinéma",
  "Jouer au billard",
  "Le sport",
  "Créer et gérer un blog",
  "Le Scrapbooking",
  "La photographie",
  "Le dessin",
  "Les jeux vidéo",
  "Les devinettes",
  "La vente en ligne",
  "Aller au restaurant",
  "Débusquer les bonnes affaires sur internet",
  "Le shopping",
  "Collectionner",
  "Écouter la radio",
  "Une fête improvisée chez soi",
  "Prendre des nouvelles d’un ami, d’un proche",
  "Établir la liste des choses à faire pour le lendemain",
  "Le repassage",
  "La poterie",
  "La randonnée"
];

export const Tags = props => {
  const [state, setState] = useContext(ProfileFormContext);
  const tagsFromServer = hobbiesList;
  const { hobbies } = state;
  const { CheckableTag } = Tag;

  function handleChange(tag, checked) {
    const { hobbies } = state;
    const nextSelectedTags = checked
      ? [...hobbies, tag]
      : hobbies.filter(t => t !== tag);
    setState({ hobbies: nextSelectedTags });
    props.setFieldValue("hobbies", nextSelectedTags);
  }

  return (
    <div>
      {tagsFromServer.map(tag => (
        <CheckableTag
          key={tag}
          checked={hobbies.indexOf(tag) > -1}
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
};
