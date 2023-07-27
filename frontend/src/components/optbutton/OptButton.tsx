import './OptButton.css'

interface ButtonProps {
    text: string;
    isDelete?: boolean;
    onClick?: () => void;
}

export default function OptButton({ text, onClick, isDelete }: ButtonProps) {
    return (
        <div className="opt-button link" onClick={onClick ? onClick : () => {}}>
            <div className="opt-button__bg"></div>
            <div 
                className="opt-button__front"
                style={{
                    background: isDelete
                        ? 'linear-gradient(180deg, #F00 0%, #111 100%)'
                        : 'linear-gradient(180deg, #CC208E 0%, #6713D2 100%)',
                }}
            >
                <div>{text}</div>
            </div>
        </div>
    )
}