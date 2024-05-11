export default function ContactFormComponent() {
    return (
        <div className="form_imputs">
            <div className="imputs">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
            </div>
            <textarea cols={30} rows={12} placeholder="Message"></textarea>
        </div>
    );
}