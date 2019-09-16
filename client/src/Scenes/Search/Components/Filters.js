import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import { UsersContext } from "./UsersContext";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Tag } from "antd";
const { CheckableTag } = Tag;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: "5%",
    marginBottom: "2%",
    marginRight: "5%"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0),
    display: "inline"
  },
  slider: {
    width: 20 + "em"
  }
}));

export default function Filters(props) {
  const [, filtersValue] = useContext(UsersContext);
  const classes = useStyles();
  // console.log(filtersValue.gender);
  const handleGenderChange = (e, value) => {
    filtersValue.setGender(value);
  };
  const handleAgeChange = (e, value) => {
    filtersValue.setAge(value);
  };
  const handlePopChange = (e, value) => {
    filtersValue.setPop(value);
  };
  const handleDistChange = (e, value) => {
    filtersValue.setDist(value);
  };
  const handleSortChange = event => {
    filtersValue.setSort(event.target.value);
  };
  const handleOrdChange = event => {
    filtersValue.setOrd(event.target.value);
  };
  function handleTagsChange(tag, checked) {
    const nextSelectedTags = checked
      ? [...filtersValue.tags, tag]
      : filtersValue.tags.filter(t => t !== tag);
    filtersValue.setTags(nextSelectedTags);
  }

  return (
    <div className={classes.root}>
      <span
        role="img"
        aria-label="wordlmap"
        style={{ fontSize: "60px", cursor: "pointer" }}
        onClick={props.onClick}
      >
        🌍
      </span>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender"
          className={classes.group}
          value={filtersValue.gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Age</FormLabel>
        <div className={classes.slider}>
          <Slider
            value={filtersValue.age}
            onChange={handleAgeChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            name="age"
            // min="18"
            // max="100"
            // AriaValueText={valuetext}
          />
        </div>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pop</FormLabel>
        <div className={classes.slider}>
          <Slider
            value={filtersValue.pop}
            onChange={handlePopChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            name="pop"
            min={0}
            max={100}
            // AriaValueText={valuetext}
          />
        </div>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Distance</FormLabel>
        <div className={classes.slider}>
          <Slider
            value={filtersValue.dist}
            onChange={handleDistChange}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            max={1000}
          />
        </div>
      </FormControl>
      {!props.map && (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Sort</InputLabel>
          <Select
            value={filtersValue.sort}
            onChange={handleSortChange}
            inputProps={{
              name: "sort",
              id: "sort"
            }}
          >
            <MenuItem value={"age"}>Age</MenuItem>
            <MenuItem value={"pop"}>Score</MenuItem>
            <MenuItem value={"dist"}>Distance</MenuItem>
          </Select>
        </FormControl>
      )}
      {filtersValue.sort && (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Order</InputLabel>
          <Select
            value={filtersValue.ord}
            onChange={handleOrdChange}
            inputProps={{
              name: "ord",
              id: "ord"
            }}
          >
            <MenuItem value={true}>Ascendant</MenuItem>
            <MenuItem value={false}>Descendant</MenuItem>
          </Select>
        </FormControl>
      )}
      <div>
        {hobbiesList.map(tag => (
          <CheckableTag
            key={tag}
            checked={filtersValue.tags.indexOf(tag) > -1}
            onChange={checked => handleTagsChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      {/* <RangeSlider/> */}
    </div>
  );
}

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
