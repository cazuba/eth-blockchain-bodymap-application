import BodyPart from '../BodyPart';

function BodyMapList(props) {
    const { title: bodyMapListTitle, bodyMap: bodyMapList, onChange, disabled = false } = props;
    const handleOnBodyPartChange = (key) => (event) => {
        onChange(event, key);
    };
    return (
        <>
            <h3>{bodyMapListTitle}</h3>
            {Object.keys(bodyMapList).map((key) => <BodyPart key={key} name={key} value={bodyMapList[key]} onChange={handleOnBodyPartChange(key)} disabled={disabled} />)}
        </>
    );
}

export default BodyMapList;