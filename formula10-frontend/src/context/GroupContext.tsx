import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GroupDTO } from "../dto/group.dto";
import { getGroupById } from "../services/group.service";

interface GroupContextType {
  group: GroupDTO | null;
  loading: boolean;
  error: string | null;
  setGroup: (group: GroupDTO) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [group, setGroup] = useState<GroupDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setLoading(true);
        const groupId = location.pathname.split('/')[2];
        if (!groupId) return;

        const fetchedGroup = await getGroupById(+groupId);
        setGroup(fetchedGroup);
      } catch (err) {
        setError("Failed to load group");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [location.pathname]);

  return (
    <GroupContext.Provider value={{ group, loading, error, setGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
