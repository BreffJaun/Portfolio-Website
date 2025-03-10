// I M P O R T:   F I L E S
import "../../src/styles/projectCard.scss";

// I M P O R T:   T Y P E S
import { Projects_ItemFromDB } from "../types/interfaces";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S

// C O D E

const ProjectCard: React.FC<Projects_ItemFromDB> = ({
  _id,
  img,
  title,
  link,
  description,
  tags,
}) => {
  // console.log("tags", tags);
  return (
    <div className="project-card">
      <div className="project-card__image-container">
        <img src={img} alt={title} className="project-card__image" />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">
          <a href={link} target="_blank">
            {title}
            <span className="material-symbols-outlined">arrow_outward</span>
          </a>
        </h3>
        <p className="project-card__description">{description}</p>
        <div className="project-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
